//models
const User = require('../models/user');
const mailTokens = require('../models/mail-tokens');
const forgotPasswordTokens = require('../models/forgot-password-tokens');
//mailers
const userMailer = require('../mailers/user_signup_mailer');
const forgotPasswordMailer = require('../mailers/forgot_password_mailer');
//packages
const crypto = require('crypto');
const bcrypt = require('bcrypt');


//rendering the dashboard on session creation
module.exports.dashboard = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('dashboard/dashboard.ejs', {
            title: 'User Dashboard',
        });
    });
}

//rendering the sign-in form
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    return res.render('sign_in', { csrfToken: req.csrfToken() });
}

//rendering the sign-up form
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    return res.render('sign_up', { csrfToken: req.csrfToken() });
}

//rendering the verify email page
module.exports.verify = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    return res.render('verify', { isVerified: true, resendMail: false, csrfToken: req.csrfToken() });
}

//rendering sign-in form on email verification
module.exports.verified = async function (req, res) {
    try {
        let token = await mailTokens.findOne({ token: req.params.token });
        if (token) {
            let user = await User.findOne({ email: token.email });
            if (user) {
                user.isVerified = true;
                user.save();
                await mailTokens.findOneAndDelete({ token: token.token });
                req.flash('info', 'Your email has been verified, please sign-in to continue');
                return res.redirect('/users/sign-in');
            }
        } else {
            req.flash('Token expired');
            return res.render('verify', { isVerified: false, resendMail: false, csrfToken: req.csrfToken() });

        }

    } catch (err) {
        req.flash('err', 'error in verifying mail');
        console.log(err);
        return res.redirect('/users/sign-up');

    }

}

// get the sign up data and send verification mail
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            let user = await new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                authVia: "local",
                isVerified: false
            });
            user = await user.save();
            let crypt_token = crypto.randomBytes(16).toString('hex');
            token = await new mailTokens({ token: crypt_token, email: user.email });
            await token.save();
            req.flash('success', 'You have Signed Up!')
            userMailer.newUser(token);
            return res.redirect('/users/verify');
        } else {
            if (user.isVerified == false) {
                req.flash('info', 'Email not verified');
                return res.render('verify', { isVerified: false, csrfToken: req.csrfToken(), resendMail: false });
            }
            req.flash('error', 'This user exists kindly sign-in');
            res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Error in signing Up')
        return res.redirect('back');
    }

}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Signed in successfully!')
    return res.redirect(`/users/dashboard/${req.user.id}`);

}

//resending verification mail form
module.exports.resendVerificationMailForm = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('info', 'You have already signed in!');
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    return res.render('verify', { isVerified: false, resendMail: true, csrfToken: req.csrfToken() });
}

//resending the verification mail
module.exports.resendVerificationMail = async function (req, res) {
    if (req.isAuthenticated()) {
        console.log("request authenticated");
        req.flash('info', 'You have already signed in!');
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'This email id is not registered!');
        return res.redirect('/users/sign-up');
    }
    if (user.isVerified == false && user.authVia == 'local') {
        let token = await mailTokens.findOne({ email: req.body.email });
        if (token) {
            await mailTokens.findOneAndDelete({ email: req.body.email });
        }
        let crypt_token = crypto.randomBytes(16).toString('hex');
        token = await new mailTokens({ token: crypt_token, email: user.email });
        await token.save();
        userMailer.newUser(token);
        return res.redirect('/users/verify');

    } else {
        req.flash('info', 'Your Email Id has already been verified');
        return res.redirect('/users/sign-in');
    }

}

//rendering forgot password page for email id
module.exports.forgotPasswordPage = function (req, res) {
    res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), reset: false, message: '' });
}

//need to add check for if token already exists
//sending forgot-password mail
module.exports.forgotPassword = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('error', 'Email not found');
            return res.redirect('back');
        }
        if (user.authVia == 'google') {
            return res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), message: "User exists with Google account. Try resetting your google account password or log in using it.", reset: false });
        }
        if (user.isVerified == false) {
            return res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), message: "Your email id has not been verified. Kindly verify your email id", reset: false });
        }
        let crypt_token = crypto.randomBytes(16).toString('hex');
        token = await new forgotPasswordTokens({ token: crypt_token, email: req.body.email });
        await token.save();
        forgotPasswordMailer.resetPassword(token);
        return res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), message: "Reset email sent. Check your email for more info.", reset: false });
    } catch (error) {
        console.log('error in sending forgot password mail', error);
        return res.redirect('/');
    }

}

//rendering reset password form from mail
module.exports.resetPasswordPage = async function (req, res) {
    let paramToken = req.params.token;
    if (paramToken) {
        let token = await forgotPasswordTokens.findOne({ token: req.params.token });
        if (token) {
            let user = await User.findOne({ email: token.email });
            if (user) {
                return res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), reset: true, email: user.email });
            } else {
                return res.redirect('/users/sign-up');
            }

        } else {
            res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), msg: "Token Tampered or Expired.", type: 'danger' });
        }
    } else {
        return res.redirect('/users-sign-in');
    }

}

//resetting the password
module.exports.resetPassword = async function (req, res) {
    console.log(req.body.password);
    if (req.body.password != req.body.confirm_password || !req.body.password || !req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    try {

        let token = await forgotPasswordTokens.findOne({ email: req.params.email });
        if (token) {
            let user = await User.findOne({ email: token.email });
            user.password = req.body.password;
            await user.save();
            await forgotPasswordTokens.findOneAndDelete({ email: token.email });
            req.flash('success', 'Your password has been changed, kindly sign-in');
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in changing password", error);
        return res.redirect('back');
    }

}

//sign-out
module.exports.destroySession = function (req, res) {

    req.logout();
    req.flash('success','You have signed out!');
    return res.redirect('/');
}
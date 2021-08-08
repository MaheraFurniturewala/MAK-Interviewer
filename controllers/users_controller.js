const User = require('../models/user');
const userMailer = require('../mailers/user_signup_mailer');
const crypto = require('crypto');
const mailTokens = require('../models/mail-tokens');



module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in',{   csrfToken: req.csrfToken() });
}

module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_up',{   csrfToken: req.csrfToken() });
}

module.exports.verify = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    return res.render('verify',{isVerified:true});
}

// module.exports.resendVerificationMail = async function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//     }
//     if()

// }

module.exports.verified = async function(req,res){
    try {
        let token = await mailTokens.findOne({token: req.params.token});
    if(token){
        let user = await User.findOne({email:token.email});
        if(user){
            user.isVerified = true;
            user.save();
            await mailTokens.findOneAndDelete({ token: token.token });
            req.flash('info','Your email has been verified, please sign-in to continue');
            return res.redirect('/users/sign-in');
        }
    }else{
        // console.log("seems to be some trouble");
        req.flash('Token expired');
        return res.render('verify',{isVerified:false,});
        
    }

    } catch(err)  {
        req.flash('err','error in verifying mail');
        console.log(err);
        return res.redirect('/users/sign-up');
        
    }
    
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Passwords do not match');
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({email:req.body.email});
        if(!user){
            let user = await new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                authVia: "local",
                isVerified:false
            });
            user = await user.save();
            let crypt_token = crypto.randomBytes(16).toString('hex');
            // console.log("crypto:: ",crypt_token);
            token = await new mailTokens({ token: crypt_token, email: user.email });
            token.save();
            req.flash('success','You have Signed Up!')
            userMailer.newUser(token);
            return res.redirect('/users/verify');
        }else{
            if(user.isVerified == false){
                req.flash('info','Email not verified');
                return res.render('verify',{isVerified:false});
            }
            req.flash('error','This user exists kindly sign-in');
            res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        req.flash('error','Error in signing Up')
        return res.redirect('back');
    }
   
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    
        return res.redirect('/');
    
}
// module.exports.destroySession = function(req, res){

//     req.logout();
//     return res.redirect('/');
// }

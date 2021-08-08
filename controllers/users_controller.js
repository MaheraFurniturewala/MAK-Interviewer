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
    return res.render('verify');
}

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
        }else{
            return res.redirect('/users/sign-up');
        }
    }

    } catch(err)  {
        req.flash('err','error in verifying mail');
        console.log(err);
        return res.redirect('/users/sign-up');
        
    }
    
    // User.findOne({id:req.body.params},function(err,user){
    //     if(err){console.log("Error in verifying email" ,err);
    //      return res.redirect('/users/sign-up');
    //     }else{
    //         if(!user){
    //             return res.redirect('/users/sign-up');
    //         }else{
    //             user.isVerified = true;
    //             user.save();
    //             return res.redirect('/users/sign-in');
    //         }
    //     }

    // });
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
            token = await mailTokens({ token: crypt_token, email: user.email }).save();
            req.flash('success','You have Signed Up!')
            userMailer.newUser(token);
            return res.redirect('/users/verify');
        }else{
            req.flash('error','This user exists')
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
    req.flash('success','Logged in successfully!');
        return res.redirect('/');
    
}
// module.exports.destroySession = function(req, res){

//     req.logout();
//     return res.redirect('/');
// }

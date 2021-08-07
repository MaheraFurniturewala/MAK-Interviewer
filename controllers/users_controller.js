const User = require('../models/user');
const userMailer = require('../mailers/user_signup_mailer');




module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in',{   csrfToken: req.csrfToken() });
}

// module.exports.signUp = function(req,res){
//     return res.render('sign_up');
// }

module.exports.verify = function(req,res){
    return res.render('verify');
}

module.exports.verified = function(req,res){
    User.findOne({id:req.body.params},function(err,user){
        if(err){console.log("Error in verifying email" ,err);
         return res.redirect('/users/sign-up');
        }else{
            if(!user){
                return res.redirect('/users/sign-up');
            }else{
                user.isVerified = true;
                user.save();
                return res.redirect('/users/sign-in');
            }
        }

    });
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
            let user = await new User(req.body);
            user = await user.save();
            req.flash('success','You have Signed Up!')
            userMailer.newUser(user);
            return res.redirect('/users/verify');
        }else{
            req.flash('error','This user exists')
            res.redirect('back');
        }
    } catch (error) {
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

const User = require('../models/user');
const userMailer = require('../mailers/user_signup_mailer');


module.exports.signIn = function(req,res){
    return res.render('sign_in.ejs');
}

module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in');
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
        return res.redirect('back');
    }

    // let user = await User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('error in creating user while signing up'); return}
    //             userMailer.newUser(user);
    //             return res.redirect('/users/verify');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user){
            let user = await new User(req.body);
            user = await user.save();
            userMailer.newUser(user);
            return res.redirect('/users/verify');
        }else{
            console.log("User exists");
            res.redirect('back');
        }
    } catch (error) {
        console.log("error in signing up:", error);
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

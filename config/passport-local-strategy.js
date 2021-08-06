const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true

},
    function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            bcrypt.compare(password, user.password, function (err, isMatch) {
                console.log(isMatch);
                if (!user) {
                    req.flash('error', 'Username does not exist');
                    return done(null, false);
                }
                if (isMatch == false) {
                    req.flash('error', 'Wrong Username/Password');
                    return done(null,false);
                }
                if(user.isVerified==false) {
                    req.flash('info', 'Email-id not verified');
                    return done(null,false);
                }

                return done(null, user);
            });

        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    console.log("inside check authentication");
    if (req.isAuthenticated()) {
        return next();
    }
    //if user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    //   console.log("Inside setAuthenticatedUser");
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
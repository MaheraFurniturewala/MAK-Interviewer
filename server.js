const express = require('express');
const port = process.env.PORT || 8000;
const db = require('./config/mongoose'); 
const app = express();
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore=require('connect-mongo')(session);
const googleStrategy = require('./config/passport-google-oauth2.0.js');
const sassMiddleware=require('node-sass-middleware');
const flash = require('connect-flash');

//setting up scss middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended:true}));

app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'mak',
    secret: 'xyzabc',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// connect-flash after the session!!!
app.use(flash());

// use express router

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`error in runnning server on port: ${port}`);
        return;
    }else{
        console.log(`Server running on port : ${port}`);
    }
});










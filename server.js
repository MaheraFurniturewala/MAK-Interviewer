const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const port = process.env.PORT || 8000;
const app = express();
require('./config/view-helpers')(app);
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./config/mongoose');
const csrf = require('csurf');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const googleStrategy = require('./config/passport-google-oauth2.0.js');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const customMware = require('./config/middleware');
const expressLayouts = require('express-ejs-layouts');
const { joinRoom } = require('./controllers/socket_controllers');
const path = require('path');

//------------------setting up scss middleware//------------------
if(env.name == 'development'){ 
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}
console.log(app.locals.assetPath('css/home.css'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.static(env.asset_path));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// ------------------creating sessions and session cookies------------------
app.use(session({
    name: 'mak',
    secret: env.session_cookie_key,
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
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// connect-flash after the session!!!
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

//------------------sockets---------------------

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
         joinRoom(socket, roomId, userId);
        socket.on('colab', (user_name) => {
            socket.broadcast.to(roomId).emit('colab', socket.id, user_name);
        });
        socket.on('change', (e, cursor, user_name) => {
            socket.broadcast.to(roomId).emit('change', socket.id, e, user_name);
        });
        socket.on('changeCursor', (user_name, cursor) => {
            socket.broadcast.to(roomId).emit('changeCursor', socket.id, cursor, user_name);
        });
        socket.on('outputReceived',(data)=>{
            console.log("outputReceived");
            io.to(roomId).emit('displayOutput',data);
        });
    });
});

//--------------------port listen----------------------

server.listen(port, (err) => {
    if (err) {
        console.log(`error in running server on port: ${port}`);
        return;
    } else {
        console.log(`Server running on port : ${port}`);
    }
    
});









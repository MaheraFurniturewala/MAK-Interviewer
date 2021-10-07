const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{ 
    interval:'1d',
    path: logDirectory,
});

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key :'xyzabc',
    db: 'mongodb+srv://mahera1:mahera1@cluster0.k05c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'interviewermak@gmail.com',
            pass: 'mak_interviewer3'
        }
    },
    google_client_id:'736952970227-ik81a2s746sogr6nar8i6pl9fgj1fbr0.apps.googleusercontent.com',
    google_client_secret: '5_tegMySOYY-Q0cTzOa7Qarg',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    morgan : {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production = {
    name : 'production',
    asset_path : process.env.MAK_ASSET_PATH,
    session_cookie_key : process.env.MAK_SESSION_COOKIE_KEY,
    db:'mongodb+srv://mahera1:mahera1@cluster0.k05c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    smtp :{
        service: process.env.MAK_SMTP_SERVICE,
        host: process.env.MAK_SMTP_HOST,
        port: parseInt(process.env.MAK_SMTP_PORT),
        secure: Boolean(process.env.MAK_SMTP_SECURE),
        auth: {
            user: process.env.MAK_SMTP_AUTH_USER,
            pass: process.env.MAK_SMTP_AUTH_PASS
        }
    },
    google_client_id : process.env.MAK_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.MAK_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.MAK_GOOGLE_CALL_BACK_URL,
    morgan : {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = production;
// (process.env.MAK_NODE_ENV) === 'production' ? production  : development;

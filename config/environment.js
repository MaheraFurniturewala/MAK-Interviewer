const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key :'xyzabc',
    db: 'mak_interviewer_development',
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
    google_call_back_url: "http://localhost:8000/users/auth/google/callback"
}


const production = {
    name : 'production',
}

module.exports = development;
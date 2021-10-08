const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (token) => {
    let htmlString = nodeMailer.renderTemplate({token:token}, '/user/reset_password.ejs');

    nodeMailer.transporter.sendMail({
       from: 'interviewermak@gmail.com',
       to: token.email,
       subject: "Reset Password",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}
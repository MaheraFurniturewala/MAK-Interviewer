const nodeMailer = require('../config/nodemailer');

exports.newUser = (token) => {
    let htmlString = nodeMailer.renderTemplate({token:token}, '/user/new_user.ejs');

    nodeMailer.transporter.sendMail({
       from: 'interviewermak@gmail.com',
       to: token.email,
       subject: "Email Verification",
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
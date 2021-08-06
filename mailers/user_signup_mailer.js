const nodeMailer = require('../config/nodemailer');

exports.newUser = (user) => {
    let htmlString = nodeMailer.renderTemplate({user:user}, '/user/new_user.ejs');

    nodeMailer.transporter.sendMail({
       from: 'interviewermak@gmail.com',
       to: user.email,
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
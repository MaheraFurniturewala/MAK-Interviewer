const Message = require('../models/messages');

module.exports.createMessage = async function(req, res){
    try{
        console.log(req.body.message);
        let message = await Message.create({
            content: req.body.message,
            user: req.user._id
        });
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    message: message
                },
                message: "message created!"
            });
        }
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}
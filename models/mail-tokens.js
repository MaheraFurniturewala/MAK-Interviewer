const mongoose = require('mongoose');

const mailTokens = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
   
    expire_at:{ type: Date, 
        default: Date.now, 
        expires: 600
     }
});

module.exports = mongoose.model('mailTokens', mailTokens);
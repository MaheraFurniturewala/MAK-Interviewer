const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    authVia: {
        type:String,
        required:true
    },
    rooms:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
        }
      ]
}, {
    timestamps: true
});

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);

    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
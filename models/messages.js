const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: String,
        required:true,
      },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    },
    {
      timestamps: true,
    }
  );

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
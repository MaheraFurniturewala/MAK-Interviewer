const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  //include the array of ids of all participants in this room
  participants: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
  ]
});

const Room = mongoose.model('Room',roomSchema);

module.exports = Room;
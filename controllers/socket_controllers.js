const Room = require('../models/Room');


module.exports.joinRoom = async (socket,roomId,userId)=>{
    console.log("Inside join room");
    let room = await Room.findOne({roomId: roomId});
    if(room){
        console.log("room exists")
        socket.join(roomId);
        console.log("Joined room")
    }else{
        console.log("Room does not exist")
        room = await new Room({roomId: roomId,});
        room.participants.push(userId);
        console.log(room)
        room = await room.save();
        socket.join(roomId);
    }
}
const Room = require('../models/room');
const User = require('../models/user');

module.exports.joinRoom = async (socket,roomId,userId)=>{
try {
    let room = await Room.findOne({roomId: roomId});
    let user = await User.findById(userId);
    if(room){
        socket.join(roomId);
    }
    else{
        room = await new Room({
            roomId : roomId,
        });
        socket.join(roomId);
    }
    let roomResult = room.participants.filter((user)=>user==userId);
    if(roomResult.length=0){
        room.participants.push(userId);
        room = await room.save();
    }
    let userResult = user.rooms.filter((rooms_ID)=>rooms_ID==room.id);
    if(userResult.length=0){
        user.rooms.push(room.id);
        user = await user.save();
    }
} catch (error) {
    console.log("Error while joining room : ",error);
}
}


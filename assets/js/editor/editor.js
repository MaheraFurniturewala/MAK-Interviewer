let targetEditor = ace.edit("editor");
let targetSession = targetEditor.getSession();

window.onload = function () {
    targetEditor.setTheme("ace/theme/monokai");
    targetEditor.session.setMode("ace/mode/c_cpp");
    targetEditor.setOptions({
        fontSize: "10pt"
      });
}

const socket = io();
socket.on('connect',()=>{
    socket.emit('join-room',roomId,userId);
    socket.emit('colab',userName);
});

socket.on('colab',(socketId,user_name,initialIndices,initialRows)=>{
    //cursor
    const targetCursorManager = new AceCollabExt.AceMultiCursorManager(targetEditor.getSession());
    targetCursorManager.addCursor(socketId, user_name, "orange", {row: 0, column: 10});

    socket.on("change",(socketId,e,user_name)=>{
        targetEditor.getSession().getDocument().applyDeltas([e]);
    });
    
    socket.on("changeCursor",(socketId,cursor,user_name)=>{
        targetCursorManager.setCursor(socketId, cursor);
    })
   
});

targetSession.getDocument().on("change", function(e) {
    console.log("change")
    socket.emit('change',e,userName);
  });

  targetSession.selection.on('changeCursor', function(e) {
    const cursor = targetEditor.getCursorPosition();
    socket.emit('changeCursor',userName,cursor);
  });

function changeLanguage() {
    let language = $("#languages").val();
    // console.log(language);

    if (language == 'c' || language == 'cpp') { targetEditor.session.setMode("ace/mode/c_cpp"); }
    else if (language == 'python') { targetEditor.session.setMode("ace/mode/python"); }
    else if (language == 'java') { targetEditor.session.setMode("ace/mode/java"); }
    else if (language == 'ruby') { targetEditor.session.setMode("ace/mode/ruby"); }
    else if (language == 'kotlin') { targetEditor.session.setMode("ace/mode/kotlin"); }
    else if (language == 'swift') { targetEditor.session.setMode("ace/mode/swift"); }
}



// function executeCode() {

//     var data = JSON.stringify({
//     "code":editor.getSession().getValue(),
//     "language":$("#languages").val(),
//     "input":""
//     });

// var config = {
// method: 'post',
// url:'/',
// headers: { 
// 'Content-Type': 'application/json'
// },
// data : data
// };

// axios(config)
// .then(function (response) {
// console.log("stay happy")

// })
// .catch(function (error) {
// console.log(error);

// });



// }


let MyEditor;
window.onload = function () {
    MyEditor = ace.edit("editor");
    MyEditor.setTheme("ace/theme/monokai");
    MyEditor.session.setMode("ace/mode/c_cpp");
    MyEditor.setOptions({
        fontSize: "10pt"
      });
}

const socket = io();
socket.on('connect',()=>{
    socket.emit('join-room',roomId,userId,userName);
});



function changeLanguage() {
    let language = $("#languages").val();
    // console.log(language);

    if (language == 'c' || language == 'cpp') { MyEditor.session.setMode("ace/mode/c_cpp"); }
    else if (language == 'python') { MyEditor.session.setMode("ace/mode/python"); }
    else if (language == 'java') { MyEditor.session.setMode("ace/mode/java"); }
    else if (language == 'ruby') { MyEditor.session.setMode("ace/mode/ruby"); }
    else if (language == 'kotlin') { MyEditor.session.setMode("ace/mode/kotlin"); }
    else if (language == 'swift') { MyEditor.session.setMode("ace/mode/swift"); }
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


// ---------------creating ace editor instance------------------
let targetEditor = ace.edit("editor");
let targetSession = targetEditor.getSession();

window.onload = function () {
    targetEditor.setTheme("ace/theme/monokai");
    targetEditor.session.setMode("ace/mode/c_cpp");
    targetEditor.setOptions({
        fontSize: "10pt"
    });
}
// --------------establishing socket connection-----------------
const socket = io();
socket.on('connect', () => {
    socket.emit('join-room', roomId, userId);
    socket.emit('colab', userName);
});

// ---------------function to display output-------------------
socket.on('displayOutput',(data)=>{
    console.log(data.output.output);
    console.log("displayOutput")
    outputArea = $('#output');
    console.log(outputArea[0]);
    outputArea[0].innerHTML = data.output.output;
    
})

// -------------making the editor collaborative using delta--------------
socket.on('colab', (socketId, user_name, initialIndices, initialRows) => {
    //cursor
    const targetCursorManager = new AceCollabExt.AceMultiCursorManager(targetEditor.getSession());
    targetCursorManager.addCursor(socketId, user_name, "orange", { row: 0, column: 10 });

    socket.on("change", (socketId, e, user_name) => {
        targetEditor.getSession().getDocument().applyDeltas([e]);
    });

    socket.on("changeCursor", (socketId, cursor, user_name) => {
        targetCursorManager.setCursor(socketId, cursor);
    })

});

targetSession.getDocument().on("change", function (e) {
    socket.emit('change', e, userName);
});

targetSession.selection.on('changeCursor', function (e) {
    const cursor = targetEditor.getCursorPosition();
    socket.emit('changeCursor', userName, cursor);
});

//   --------------select language dropdown--------------
function changeLanguage() {
    let language = $("#languages").val();


    if (language == 'c' || language == 'cpp') { targetEditor.session.setMode("ace/mode/c_cpp"); }
    else if (language == 'python') { targetEditor.session.setMode("ace/mode/python"); }
    else if (language == 'java') { targetEditor.session.setMode("ace/mode/java"); }
    else if (language == 'ruby') { targetEditor.session.setMode("ace/mode/ruby"); }
    else if (language == 'kotlin') { targetEditor.session.setMode("ace/mode/kotlin"); }
    else if (language == 'swift') { targetEditor.session.setMode("ace/mode/swift"); }
}

// ----------------axios request to server to compile code----------------
function executeCode() {
    var data = JSON.stringify({
        "code": targetEditor.getSession().getValue(),
        "language": $("#languages").val(),
        "input": ""
    });

    var config = {
        method: 'post',
        url: '/compile/compile_code',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            socket.emit('outputReceived', response.data.data);
        })
        .catch(function (error) {
            console.log(error);

        });
}


// status: 0,
// errorCode: 0,
// error: null,
// outputType: 0,
// output: 'Hello world',
// outputStyle: null,
// date: '0001-01-01T00:00:00',
// language: 'cpp',
// input: '',
// id: 0
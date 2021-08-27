let MyEditor;
let MyEditorSession
MyEditor = ace.edit("editor");
MyEditorSession = MyEditor.getSession();

window.onload = function () {
    MyEditor.setTheme("ace/theme/monokai");
    MyEditor.session.setMode("ace/mode/c_cpp");
    MyEditor.setOptions({
        fontSize: "10pt"
    });
}

console.log(MyEditor.selection.getAllRanges())
const socket = io();
socket.on('connect', () => {
    socket.emit('join-room', roomId, userId, userName);
    socket.emit('emmiting-my-editor', userName, MyEditor);
    socket.on('emmiting-editor-others', (sourceSocketId, sourceUserName, sourceEditor) => {
        sourceSession = sourceEditor.getSession();
        //cursor
        const MyCursorManager = new AceCollabExt.AceMultiCursorManager(MyEditor.getSession());
        MyCursorManager.addCursor(sourceSocketId, sourceUserName, orange, 0);
        
        //selection
        const MySelectionManager = new AceCollabExt.AceMultiSelectionManager(MyEditor.getSession());
        MySelectionManager.addSelection(sourceSocketId, sourceUserName, orange, []);

        //radarView
        const radarView = new AceCollabExt.AceRadarView("my-radar-view", MyEditor);

        //timeout
        setTimeout(function() {
            radarView.addView("fake1", "fake1",  "RoyalBlue", {start: 60, end: 75}, 50);
            radarView.addView("fake2", "fake2",  "lightgreen", {start: 10, end: 50}, 30);
          
            const initialIndices = AceCollabExt.AceViewportUtil.getVisibleIndexRange(sourceEditor);
            const initialRows = AceCollabExt.AceViewportUtil.indicesToRows(sourceEditor, initialIndices.start, initialIndices.end);
            radarView.addView(sourceSocketId, sourceUserName, orange, initialRows, 0);
          }, 0);

          //session
          sourceSession.getDocument().on("change", function(e) {
            MyEditor.getSession().getDocument().applyDeltas([e]);
          });

          //change cursor position
          sourceSession.selection.on('changeCursor', function(e) {
            const cursor = sourceEditor.getCursorPosition();
            MyCursorManager.setCursor(sourceSocketId, cursor);
            radarView.setCursorRow(sourceSocketId, cursor.row);
          });

          //selection change
          sourceSession.selection.on('changeSelection', function(e) {
            const rangesJson = AceCollabExt.AceRangeUtil.toJson(sourceEditor.selection.getAllRanges());
            const ranges = AceCollabExt.AceRangeUtil.fromJson(rangesJson);
            MySelectionManager.setSelection(sourceSocketId, ranges);
          });
    });
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



let editor;
editor = ace.edit("editor");
//inside window.onload fn configure our editor
// to initialize thee ace editor
window.onload = function () {
    //arg is  the id of the div where we want to keep our editor
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
}

//configure editor mode whenever language will be  changed from the dropdown
// from onchange attribute in dropdown
function changeLanguage() {
    let language = $("#languages").val();
    // console.log(language);

    if (language == 'c' || language == 'cpp') { editor.session.setMode("ace/mode/c_cpp"); }
    else if (language == 'python') { editor.session.setMode("ace/mode/python"); }
    else if (language == 'java') { editor.session.setMode("ace/mode/java"); }
    else if (language == 'ruby') { editor.session.setMode("ace/mode/ruby"); }
    else if (language == 'kotlin') { editor.session.setMode("ace/mode/kotlin"); }
    else if (language == 'swift') { editor.session.setMode("ace/mode/swift"); }
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
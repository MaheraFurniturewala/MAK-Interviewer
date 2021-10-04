let targetEditor=ace.edit("editor"),targetSession=targetEditor.getSession();window.onload=function(){targetEditor.setTheme("ace/theme/monokai"),targetEditor.session.setMode("ace/mode/c_cpp"),targetEditor.setOptions({fontSize:"10pt"})};const socket=io();function changeLanguage(){let e=$("#languages").val();"c"==e||"cpp"==e?targetEditor.session.setMode("ace/mode/c_cpp"):"python"==e?targetEditor.session.setMode("ace/mode/python"):"java"==e?targetEditor.session.setMode("ace/mode/java"):"ruby"==e?targetEditor.session.setMode("ace/mode/ruby"):"kotlin"==e?targetEditor.session.setMode("ace/mode/kotlin"):"swift"==e&&targetEditor.session.setMode("ace/mode/swift")}function executeCode(){var e=JSON.stringify({code:targetEditor.getSession().getValue(),language:$("#languages").val(),input:""});axios({method:"post",url:"/compile/compile_code",headers:{"Content-Type":"application/json"},data:e}).then((function(e){socket.emit("outputReceived",e.data.data)})).catch((function(e){console.log(e)}))}socket.on("connect",(()=>{socket.emit("join-room",roomId,userId),socket.emit("colab",userName)})),socket.on("displayOutput",(e=>{outputArea=document.getElementById("output"),outputArea.innerHTML="",p=document.createElement("p"),p.innerHTML=`<ul style="list-style:none;">\n    <li>${e.output.output}</li>\n    </ul>`,outputArea.appendChild(p),-1!=e.output.output.search("Error")||-1!=e.output.output.search("error")?outputArea.style.color="red":outputArea.style.color="green"})),socket.on("colab",((e,t,o,n)=>{const s=new AceCollabExt.AceMultiCursorManager(targetEditor.getSession());s.addCursor(e,t,"orange",{row:0,column:10}),socket.on("change",((e,t,o)=>{targetEditor.getSession().getDocument().applyDeltas([t])})),socket.on("changeCursor",((e,t,o)=>{s.setCursor(e,t)}))})),targetSession.getDocument().on("change",(function(e){socket.emit("change",e,userName)})),targetSession.selection.on("changeCursor",(function(e){const t=targetEditor.getCursorPosition();socket.emit("changeCursor",userName,t)}));let dateCont=document.getElementsByClassName("date"),currentDate=moment().format("MMMM Do YYYY");dateCont[0].innerText=`${currentDate}`;
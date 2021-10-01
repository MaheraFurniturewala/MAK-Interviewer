function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  
{ 
  let sendMessage = function(){
    let newMessageForm = $('#message-form');

    newMessageForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/chat/newMessage',
            data: newMessageForm.serialize(),
            success: function(data){
                let newMessage = newMessageDom(data.data.message);
                $('#chat-body>ul').append(newMessage);
            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

let newMessageDom = function(message){
  return $(`<li id="message-${message}">
              <p>
                  ${ message }
                  <br>
          </li>`)
}

sendMessage();

}
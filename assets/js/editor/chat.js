function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

{
  let sendMessage = function () {
    let newMessageForm = $("#message-form");

    newMessageForm.submit(function (e) {
      e.preventDefault(newMessageForm.serialize());

      $.ajax({
        type: "post",
        url: "/chat/newMessage",
        data: newMessageForm.serialize(),
        success: function (data) {
          let newMessage = newMessageDom(data.data.message);
          $("#chat-body>ul").append(newMessage);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  let newMessageDom = function (message) {
    return $(`<li id="message-${message._id}"
      <p>                 
        ${message.content}
        <br>
        <small>
          ${message.user}
        </small>
        </p>
      </li>`);
  };
  sendMessage();
}

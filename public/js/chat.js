const socket = io();

// REGISTER NAME////
let sender = localStorage.getItem("user");
let recipient;

$("#welcome").append(`Hi, ${sender}!`);

//get sender from login info and add to list of users
socket.emit("new-name", { name: sender });
socket.on("emit-users", function(data) {
  if (sender) {
    //jquery convention
    const $select = $(`<select multiple class="form-control">`);
    $select.append("<option disabled>Select Recipient</option>");
    data.forEach(e => $select.append(`<option>${e}</option>`));
    $("#select-container").empty();
    $("#select-container").append($select);

    //new style of user list/////
    // $("#user-list").empty();
    // data.forEach(e => $("#user-list").append(`<button type="button" class="list-group-item list-group-item-action">${e}</button>`));
    ///////
  }
});

function isNotEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}

const render = function(dataList){
  if (isNotEmpty(dataList)) {
    dataList.forEach(e => {
      if(e.sender===sender){
        $("#content").append(`<div class='message from-you'>You: ${e.message} </div><br />`)
      } else{
        $("#content").append(`<div class='message from-others'>${e.sender}: ${e.message} </div><br />`)
      }
    }
    );
  }
};

//display message on private sockets
socket.on("emit-message", function(data) {
  // $("#content").append(`${data.sender}: ${data.message} <br />`);
  render(data);
});

const sendMessage = function(event) {
  const message = $("#message").val();
  $('#message').val('');
  event.preventDefault();
  if (message.length === 0) {
    $("#content").append("<span style='color: red;'>Message cannot be empty!</span> <br />");
  } else {
    //check if recipient field is valid, then send message
    if(recipient){
      const newMessage = {
        message: message,
        sender: sender,
        recipient: recipient
      };
      //send to server, calling new-message to reference in message-sockets.js, create new object with message property and attach value message to it
      $.ajax({
        url: `/api/chat/${sender}/${recipient}`,
        method: "POST",
        data: newMessage
      });
      //send message to server under "new-message" tag
      socket.emit("new-message", newMessage);
    } else{
      //if recipient field is not valid, then throw error
      $("#content").append("<span style='color: red;'>Please select recipient!</span> <br />");
    }
    
  }
};

$("#send-msg").on("click", sendMessage);


const startChat = function(event) {
  //get the selected text from drop down
  //put code to empty chat area here
  $('#content').empty();
  recipient = $("select")
    .find(":selected")
    .text();
  if(recipient === sender){
    $("#content").append("<span style='color: red;'>Recipient cannot be yourself!</span> <br />");
  } else{
    $.ajax({ url: `/api/chat/${sender}/${recipient}`, method: "GET" }).then(
      function(data) {
        if (isNotEmpty(data)) {
          data.forEach(e => {
            if(e.sender===sender){
              $("#content").append(`<div class='message from-you'>You: ${e.message} </div><br />`)
            } else{
              $("#content").append(`<div class='message from-others'>${e.sender}: ${e.message} </div><br />`)
            }
          }
          );
        }
      }
    )
    .catch(function(err){
      console.log(err);
    })
  }
};

$("#select-container").on("change", "select", startChat);

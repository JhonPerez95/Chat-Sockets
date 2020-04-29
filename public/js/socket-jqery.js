var params = new URLSearchParams(window.location.search);
var user = { name: params.get("nombre"), room: params.get("sala") };

// Referencias Jquery
var divUsers = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var divChatbox = $("#divChatbox");

// Render User
function renderUsers(users) {
  console.log(users);

  var html = " ";

  html += "<li>";
  html +=
    '<a href="javascript:void(0)" class="active">  Chat de <span> ' +
    params.get("sala") +
    " </span> </a>";
  html += "</li>";

  for (let i = 0; i < users.length; i++) {
    html += "<li>";
    html +=
      '   <a data-id="' +
      users[i].id +
      '" href="javascript:void(0)" ><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"/><span>' +
      users[i].name +
      '<small class="text-success">online</small></span></a>';
    html += "</li>";
  }

  divUsers.html(html);
}

function renderMessage(message, yo) {
  html = "";
  var date = new Date(message.date);
  var hour = date.getHours() + ":" + date.getMilliseconds();

  var adminClass = "info";
  if (message.name === "Admin") {
    adminClass = "danger";
  }

  if (yo) {
    // messages written by me
    html += '<li class="reverse">';
    html += '  <div class="chat-content">';
    html += "    <h5> " + message.name + "</h5>";
    html +=
      '    <div class="box bg-light-inverse">' + message.message + "</div>";
    html += "  </div>";
    html += '  <div class="chat-img">';
    html += '    <img src="assets/images/users/5.jpg" alt="user" />';
    html += "  </div>";
    html += '  <div class="chat-time">' + hour + "</div>";
    html += "</li>;";
  } else {
    // messages written by others
    html += '<li class=" animated fadeIn">';
    if (message.name !== "Admin") {
      html +=
        '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '   <div class="chat-content">';
    html += "     <h5>" + message.name + "</h5>";
    html +=
      '     <div class="box bg-light-' +
      adminClass +
      '">' +
      message.message +
      "</div>";
    html += "   </div>";
    html += '   <div class="chat-time">' + hour + "</div>";
    html += " </li>";
  }

  divChatbox.append(html);
}

// Fuction for scroll
function scrollBottom() {
  var newMessage = divChatbox.children("li:last-child");

  var clientHeight = divChatbox.prop("clientHeight");
  var scrollTop = divChatbox.prop("scrollTop");
  var scrollHeight = divChatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// Listeners
divUsers.on("click", "a", function () {
  var id = $(this).data("id");

  if (id) {
    console.log(id);
  }
});

formEnviar.on("submit", function (event) {
  event.preventDefault();

  if (txtMensaje.val().trim().length === 0) {
    return;
  }
  socket.emit(
    "notification",
    {
      name: user.name,
      message: txtMensaje.val(),
    },
    function (message) {
      txtMensaje.val("").focus();
      renderMessage(message, true);
      scrollBottom();
      // console.log("Server: ", res);
    }
  );
});

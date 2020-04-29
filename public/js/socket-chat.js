// Connect Scoket to Server
var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("The name and Room is necessary");
}
var user = { name: params.get("nombre"), room: params.get("sala") };

socket.on("connect", () => {
  // Send
  socket.emit("inChat", user, (res) => {
    renderUsers(res);
    // console.log("Connect User: ", res);
  });
});

// socket.emit("notification", {});

socket.on("disconnect", () => {
  //
});

// Listening to Back-End
socket.on("notification", (data) => {
  renderMessage(data, false);
  scrollBottom();

  // console.log(`${data.name}: `, data.message, data.date);
});

socket.on("privateMessage", (data) => {
  console.log(`${data.name}: ${data.message}`);
});

socket.on("listPeople", (data) => {
  renderUsers(data);
  // console.log("People Connect:", data);
});

// Events Front - End

// Send info to Back-End

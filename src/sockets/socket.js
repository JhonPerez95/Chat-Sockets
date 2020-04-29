const { io } = require("../server");
const { User } = require("../classes/user");
const { notificacion } = require("../utils/utils");

const user = new User();

// Listening Front-End
io.on("connection", (client) => {
  // Listen
  client.on("inChat", (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        err: true,
        message: "The name/room is necessary",
      });
    }

    client.join(data.room);

    user.addPerson(client.id, data.name, data.room);

    // Send
    client.broadcast
      .to(data.room)
      .emit("listPeople", user.getPeopleRoom(data.room));

    callback(user.getPeopleRoom(data.room));
  });

  client.on("privateMessage", (data) => {
    let person = user.getById(client.id);

    client.broadcast
      .to(data.room)
      .emit("privateMessage", notificacion(person.name, data.message));
  });

  client.on("notification", (data) => {
    let person = user.getById(client.id);
    let message = data.message;
    client.broadcast
      .to(person.room)
      .emit("notification", notificacion(person.name, message));
  });

  client.on("disconnect", () => {
    let userDelete = user.deletePerson(client.id);

    // Send
    client.broadcast
      .to(userDelete.room)
      .emit("notification", notificacion("Admin", `${userDelete.name} salió`));
    client.broadcast
      .to(userDelete.room)
      .emit("listPeople", user.getPeopleRoom(userDelete.room));
  });
});

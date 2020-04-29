const express = require("express");
const SocketIO = require("socket.io");

const path = require("path");
const http = require("http");

// Initializations
const app = express();
const server = http.createServer(app);

// Settings
const pathPublic = path.resolve(__dirname, "../public");
port = process.env.PORT;

// Middleware
app.use(express.static(pathPublic));

// Connect active server Backend
module.exports.io = SocketIO(server);
require("./sockets/socket");

// Routes

module.exports = server;

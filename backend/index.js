const express = require("express");
const http = require("http");
const cors = require("cors");
const BodyParser = require("body-parser");
require("dotenv").config();
const connection = require("./db");

connection();

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(BodyParser.json());

const usersRoutes = require("./controllers/users");
const messagesRoutes = require("./controllers/messages");
const SocketService = require("./socket/socketService");
app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);
app.set('socketService', new SocketService(server));

app.get("/", (req, res) => {
  console.log("hey");
  return res.send("Hello world");
});

server.listen(3001, () => {
  console.log("Socket listening on *:3001");
});

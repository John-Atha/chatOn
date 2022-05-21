const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const BodyParser = require("body-parser");
require('dotenv').config();
const connection = require('./db');

connection();

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(BodyParser.json());

const usersRoutes = require("./controllers/users");
const messagesRoutes = require("./controllers/messages");
app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);

app.get('/', (req, res) => {
    console.log("hey")
    return res.send("Hello world");
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

// app.listen(3002, () => {
//     console.log("App listening on *:3002");
// })

server.listen(3001, () => {
  console.log("Socket listening on *:3001");
});

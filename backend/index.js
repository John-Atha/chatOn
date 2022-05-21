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

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   /*
//     * front-end sends a `join_room` request with his/her id
//     * each user has his own room, speicified by his id
//   */
//   socket.on("join_room", (data) => {
//     console.log(data);
//     const { user_id } = data || {};
//     if (!user_id) {
//       return;
//     }
//     socket.join(user_id);
//   });

//   /*
//     1. user posts a new message
//     2. back-end confirms the post
//     3. user fires a `message_sent` event to back-end
//     4. 
//   */
//   socket.on("message_sent", (data) => {
//     console.log(data);
//     const { receiver } = data;
//     socket.to(receiver).emit("new_message");
//   });
// });

server.listen(3001, () => {
  console.log("Socket listening on *:3001");
});

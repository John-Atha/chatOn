/* code scaffold from:
    https://dev.to/wakeupmh/how-to-decouples-emit-events-from-connection-event-into-socket-io-8dk
*/
const { Server } = require("socket.io");
// const socketIo = require('socket.io');

class SocketService {
  constructor(server) {
    //  this.io = socketIo(server);

    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      /*
       * front-end sends a `join_room` request with his/her id
       * each user has his own room, speicified by his id
       */
      socket.on("join_room", (data) => {
        console.log(data);
        const { user_id } = data || {};
        if (!user_id) {
          return;
        }
        socket.join(user_id);
      });
    });
  }

  emiter(event, body) {
    if (body) {
      this.io.emit(event, body);
    }
  }

  /*
   * emit
   * the `event_key`
   * with some `body`
   * to the room with the specified `room_id`
   */
  group_emitter(event_key, room_id, body) {
    if (event_key && room_id && body) {
      this.io.to(room_id).emit(event_key, body);
    }
  }
}

module.exports = SocketService;

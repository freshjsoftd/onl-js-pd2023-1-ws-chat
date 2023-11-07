const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { Message } = require("./models");
const { SOCKET_EVENTS } = require('../client/src/constant/constants')

const PORT = 5000;

const httpServer = http.createServer(app);

const ioOptions = {
  cors: {
    origin: "http://localhost:3000",
  },
};

const io = new Server(httpServer, ioOptions);

/* const SOCKET_EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR'
} */
io.on("connect", (socket) => {
  console.log("user has been connected");
  console.log(socket.id)

  // Message
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (message) => {
    try {
      const mesInstanse = new Message(message);
      const createdMessage = await mesInstanse.save();
      io.emit(SOCKET_EVENTS.NEW_MESSAGE, createdMessage);
    } catch (error) {
      socket.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error.message);
    }
  });
  socket.on('disconnect', () => {
    console.log('user has been disconnected')
  })
});

const count = io.engine.clientsCount;

console.log('Number for client coonection is ', count)

httpServer.listen(PORT, () => {
  console.log(`Server has been running at ${PORT}`);
});
// addEventListener('click, () => console.log)

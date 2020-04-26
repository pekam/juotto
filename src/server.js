const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Keep in sync with frontend/src/App.js
const port = 3001;

io.on("connection", (socket) => {
  console.log("connection");

  socket
    .on("disconnect", () => {
      console.log("disconnect");
      socket.roomId && updateRoom(socket.roomId);
    })
    .on("joinRoom", (username, roomId) => {
      console.log("joinRoom");
      joinRoom(socket, username, roomId);
    })
    .on("startGame", () => {
      const clientsInRoom = getClientsInRoom(socket.roomId);
      if (clientsInRoom.length < 2 || clientsInRoom[0].id !== socket.id) {
        // Invalid
        return;
      }
      updateRoom(socket.roomId, { gameStarted: true });
    });
});

const joinRoom = (socket, username, roomId) => {
  socket.username = username;
  socket.roomId = roomId;
  socket.join(roomId, () => updateRoom(roomId));
};

const updateRoom = (roomId, props = {}) => {
  if (hasRoom(roomId)) {
    io.to(roomId).emit("update", {
      roomId,
      clients: getClientsInRoom(roomId),
      ...props,
    });
  }
};

const getClientsInRoom = (roomId) =>
  Object.getOwnPropertyNames(io.sockets.adapter.rooms[roomId].sockets)
    .map(getSocketById)
    .map(({ username, id }) => ({ username, id }));

const hasRoom = (roomId) => !!io.sockets.adapter.rooms[roomId];

const getSocketById = (socketId) => io.sockets.sockets[socketId];

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

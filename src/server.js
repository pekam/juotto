const { initGame, setReady } = require("./game.js");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const MAX_CLIENTS_IN_ROOM = 10;

const server = express()
  .use(express.static(path.join(__dirname, "..", "frontend", "build")))
  .listen(PORT, console.log(`listening on ${PORT}`));

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("connection");

  socket
    .on("disconnect", () => {
      console.log("disconnect");
      socket.roomId && updateRoom(socket.roomId);
    })
    .on("joinRoom", (username, roomId) => {
      console.log("joinRoom");
      if (hasRoom(roomId) && getRoom(roomId).game) {
        sendError(
          socket,
          "Unable to join. There's already an active game in this room."
        );
      } else if (getClientsInRoom(roomId).length >= MAX_CLIENTS_IN_ROOM) {
        sendError(socket, "Unable to join. The lobby is full.");
      } else {
        joinRoom(socket, username, roomId);
      }
    })
    .on("startGame", () => {
      const clientsInRoom = getClientsInRoom(socket.roomId);
      if (clientsInRoom.length < 2 || clientsInRoom[0].id !== socket.id) {
        // Invalid
        return;
      }
      const game = initGame(clientsInRoom);
      getRoom(socket.roomId).game = game;
      updateRoom(socket.roomId, { game });
    })
    .on("ready", () => {
      const game = setReady(socket.id, getRoom(socket.roomId).game);
      getRoom(socket.roomId).game = game;
      updateRoom(socket.roomId, { game });
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

const sendError = (socket, errorMsg) => socket.emit("errorMsg", errorMsg);

const getClientsInRoom = (roomId) =>
  hasRoom(roomId)
    ? Object.getOwnPropertyNames(getRoom(roomId).sockets)
        .map(getSocketById)
        .map(({ username, id }) => ({ username, id }))
    : [];

const hasRoom = (roomId) => !!getRoom(roomId);

const getRoom = (roomId) => io.sockets.adapter.rooms[roomId];

const getSocketById = (socketId) => io.sockets.sockets[socketId];

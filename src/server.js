const { initGame, setReady } = require("./game.js");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const MAX_CLIENTS_IN_ROOM = 10;

const server = express()
  // Serve also static resources in production.
  // While developing, it's recommended to run the
  // dev server from the frontend sub-project instead.
  .use(express.static(path.join(__dirname, "..", "frontend", "build")))
  .listen(PORT, console.log(`listening on ${PORT}`));

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("connection");

  socket
    .on("disconnect", () => {
      console.log("disconnect");
      const state = getRoomState(socket.roomId);
      if (state) {
        updateRoom(socket.roomId, {
          ...state,
          clients: state.clients.filter((client) => client.id !== socket.id),
        });
      }
    })
    .on("joinRoom", (username, roomId) => {
      console.log("joinRoom");
      const state = getRoomState(roomId);
      if (state && state.gameStarted) {
        sendError(
          socket,
          "Unable to join. There's already an active game in this room."
        );
      } else if (state && state.clients.length >= MAX_CLIENTS_IN_ROOM) {
        sendError(socket, "Unable to join. The lobby is full.");
      } else {
        joinRoom(socket, username, roomId);
      }
    })
    .on("startGame", () => {
      const state = getRoomState(socket.roomId);
      if (!state) {
        return;
      }
      if (state.clients[0].id !== socket.id) {
        // Invalid
        return;
      }
      const nextState = initGame(state);
      updateRoom(socket.roomId, { ...nextState, gameStarted: true });
    })
    .on("ready", () => {
      const state = getRoomState(socket.roomId);
      if (!state) {
        return;
      }
      const nextState = setReady(socket.id, state);
      updateRoom(socket.roomId, nextState);
    });
});

const joinRoom = (socket, username, roomId) => {
  socket.roomId = roomId;
  const client = { id: socket.id, username };
  const state = getRoomState(roomId);

  const nextState = !state
    ? { roomId, clients: [client] } // initial state
    : { ...state, clients: [...state.clients, client] };

  socket.join(roomId, () => updateRoom(roomId, nextState));
};

const updateRoom = (roomId, nextState) => {
  const room = getRoom(roomId);
  if (room) {
    room.state = nextState;
    io.to(roomId).emit("update", room.state);
  }
};

const sendError = (socket, errorMsg) => socket.emit("errorMsg", errorMsg);

const getRoomState = (roomId) => {
  const room = getRoom(roomId);
  return room && room.state;
};

const getRoom = (roomId) => io.sockets.adapter.rooms[roomId];

const getSocketById = (socketId) => io.sockets.sockets[socketId];

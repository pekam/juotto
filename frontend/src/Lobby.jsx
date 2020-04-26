import React from "react";

export default ({ clients, roomId, socketId, startGame }) => (
  <div>
    <h1>Lobby {roomId}</h1>
    <h2>Players:</h2>
    {clients.map(({ username, id }) => (
      <div key={id}>{username}</div>
    ))}
    <button
      hidden={socketId !== clients[0].id}
      disabled={clients.length < 2}
      onClick={startGame}
    >
      Start
    </button>
  </div>
);

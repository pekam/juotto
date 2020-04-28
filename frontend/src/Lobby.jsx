import React from "react";

export default ({ clients, roomId, socketId, startGame }) => {
  const firstInLobby = socketId === clients[0].id;
  return (
    <div>
      <h1>Lobby {roomId}</h1>
      <h2>Players:</h2>
      <ul>
        {clients.map(({ username, id }) => (
          <li key={id}>{username}</li>
        ))}
      </ul>
      <button
        className="primaryButton"
        disabled={!firstInLobby || clients.length < 2}
        onClick={startGame}
      >
        Start
      </button>
      <div>
        (the first in lobby can start the game when there's at least 2 players)
      </div>
    </div>
  );
};

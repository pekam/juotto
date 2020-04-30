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
        disabled={!firstInLobby}
        onClick={startGame}
      >
        Start the juottoing
      </button>
      <div>
        (only the first player in the lobby can start the game of Juotto)
      </div>
    </div>
  );
};

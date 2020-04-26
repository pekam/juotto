import React from "react";
import socketIOClient from "socket.io-client";
import Home from "./Home";
import Lobby from "./Lobby";

// Keep in sync with server.js
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      gameStarted: false,
      clients: [],
      roomId: "",
    };
  }

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on("update", this.update);
  }

  joinRoom = (username, roomId) => {
    this.socket.emit("joinRoom", username, roomId);
  };

  update = (serverState) => {
    this.setState({ joined: true, ...serverState });
  };

  startGame = () => {
    this.socket.emit("startGame");
  };

  render() {
    return (
      <div>
        {!this.state.joined ? (
          <Home joinRoom={this.joinRoom} />
        ) : !this.state.gameStarted ? (
          <Lobby
            {...this.state}
            socketId={this.socket.id}
            startGame={this.startGame}
          />
        ) : (
          "game started"
        )}
      </div>
    );
  }
}

export default App;

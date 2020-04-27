import React from "react";
import socketIOClient from "socket.io-client";
import Home from "./Home";
import Lobby from "./Lobby";
import Hand from "./Hand";
import GameView from "./GameView";

// Keep in sync with server.js
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      game: null,
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
    console.log(serverState);
    this.setState({ joined: true, ...serverState });
  };

  startGame = () => {
    this.socket.emit("startGame");
  };

  setReady = () => {
    this.socket.emit("ready");
  };

  render() {
    return (
      <div>
        {!this.state.joined ? (
          <Home joinRoom={this.joinRoom} />
        ) : !this.state.game ? (
          <Lobby
            {...this.state}
            socketId={this.socket.id}
            startGame={this.startGame}
          />
        ) : (
          <GameView
            clients={this.state.game.clients}
            onReadyClick={this.setReady}
            ready={this.me.ready}
          />
        )}
      </div>
    );
  }

  get me() {
    return this.state.game?.clients.find(
      (client) => client.id === this.socket.id
    );
  }
}

export default App;

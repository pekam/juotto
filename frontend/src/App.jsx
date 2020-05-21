import React from "react";
import socketIOClient from "socket.io-client";
import Home from "./Home";
import Lobby from "./Lobby";
import GameView from "./GameView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Remove the parameter of socketIOClient()
    // for production build
    this.socket = socketIOClient("localhost:8080")
      .on("update", this.update)
      .on("errorMsg", (msg) => alert(msg));
  }

  joinRoom = (username, roomId) => {
    this.socket.emit("joinRoom", username, roomId);
  };

  update = (serverState) => {
    console.log(serverState);
    this.setState(serverState);
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
        {!this.isInRoom ? (
          <Home joinRoom={this.joinRoom} />
        ) : !this.state.gameStarted ? (
          <Lobby
            {...this.state}
            socketId={this.socket.id}
            startGame={this.startGame}
          />
        ) : (
          <GameView
            {...this.state}
            onReadyClick={this.setReady}
            ready={this.me.ready}
          />
        )}
      </div>
    );
  }

  get isInRoom() {
    return !!this.state.clients;
  }

  get me() {
    return this.state.clients?.find((client) => client.id === this.socket.id);
  }
}

export default App;

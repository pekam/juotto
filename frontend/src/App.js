import React from "react";
import socketIOClient from "socket.io-client";
import Home from "./Home";

// Keep in sync with server.js
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on("update", console.log);
  }

  joinRoom = (username, roomId) => {
    this.socket.emit("joinRoom", username, roomId);
  };

  render() {
    return (
      <div>
        <Home joinRoom={this.joinRoom} />
      </div>
    );
  }
}

export default App;

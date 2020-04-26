import React from "react";
import socketIOClient from "socket.io-client";

// Keep in sync with server.js
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: "..." };
  }

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on("msg", (data) => this.setState({ time: data }));
  }

  render() {
    return <div>{this.state.time}</div>;
  }
}

export default App;

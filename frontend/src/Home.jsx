import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      roomId: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.joinRoom(this.state.username, this.state.roomId);
  };

  render() {
    return (
      <div>
        <h1>Juotto</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </label>
          <br />
          <label>
            Room id:
            <input
              onChange={(e) => this.setState({ roomId: e.target.value })}
            />
          </label>
          <br />
          <button className="primaryButton" type="submit">
            Join room
          </button>
        </form>
      </div>
    );
  }
}

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
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </label>
          <label>
            Room id:
            <input
              onChange={(e) => this.setState({ roomId: e.target.value })}
            />
          </label>
          <button type="submit">Join room</button>
        </form>
      </div>
    );
  }
}

import React from "react";
import Hand from "./Hand";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.clients.map((client) => (
          <Hand key={client.id} client={client} />
        ))}
      </div>
    );
  }
}

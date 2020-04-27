import React from "react";
import Hand from "./Hand";

export default (props) => (
  <div>
    {props.clients.map((client) => (
      <Hand key={client.id} client={client} />
    ))}
    <div onClick={props.onReadyClick} hidden={props.ready}>
      Click when ready
    </div>
  </div>
);

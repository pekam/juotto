import React from "react";
import Hand from "./Hand";
import Card from "./Card";

export default (props) => (
  <div>
    {props.clients.map((client) => (
      <Hand key={client.id} client={client} />
    ))}
    <Card card={props.activeCard} />
    {props.action || ""}
    <div onClick={props.onReadyClick} hidden={props.ready}>
      Click when ready
    </div>
  </div>
);

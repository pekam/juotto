import React from "react";
import Hand from "./Hand";
import Card from "./Card";

export default (props) => (
  <div className="gameView">
    {props.clients.map((client) => (
      <Hand key={client.id} client={client} />
    ))}
    <div className="commandCardArea">
      <Card card={props.activeCard} />
      <span>{props.action ? actionToText(props.action) : ""}</span>
    </div>
    <button
      className="primaryButton"
      onClick={props.onReadyClick}
      disabled={props.ready}
    >
      {props.ready ? "Waiting for others..." : "Click when ready"}
    </button>
  </div>
);

const actionToText = ({ type, n }) => {
  return `${type === "drink" ? "Ottaa" : "Määrää"} ${n}`;
};

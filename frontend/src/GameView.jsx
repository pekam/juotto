import React from "react";
import Hand from "./Hand";
import Card from "./Card";

export default (props) => {
  const gameOver = props.deck.length === 0;
  return (
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
        disabled={props.ready || gameOver}
      >
        {gameOver
          ? "Game over"
          : props.ready
          ? "Waiting for others..."
          : "Click when ready"}
      </button>
    </div>
  );
};

const actionToText = ({ type, n }) => {
  return `${type === "drink" ? "Ottaa" : "Määrää"} ${n}`;
};

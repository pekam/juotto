import React from "react";
import Card from "./Card";

export default ({ client }) => {
  return (
    <div className="hand">
      <h3 className="username">{client.username}</h3>
      {client.hand.map((card) => (
        <Card key={card.suite + card.rank} card={card} />
      ))}
    </div>
  );
};

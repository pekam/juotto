import React from "react";
import Card from "./Card";

export default ({ client }) => {
  return (
    <div>
      <h3>{client.username}</h3>
      {client.hand.map((card) => (
        <Card key={card.suite + card.rank} card={card} />
      ))}
    </div>
  );
};

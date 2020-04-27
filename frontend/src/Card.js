import React from "react";

export default ({ card }) => {
  const image = card
    ? require(`./cards/${card.rank}${card.suite}.svg`)
    : require(`./cards/RED_BACK.svg`);
  return <img className="card" src={image} />;
};

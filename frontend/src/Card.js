import React from "react";

export default ({ card }) => {
  const image = require(`./cards/${card.rank}${card.suite}.svg`);
  return <img className="card" src={image} />;
};

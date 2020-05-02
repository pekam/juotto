import React from "react";

export default ({ card, highlight }) => {
  const image = card
    ? require(`./cards/${card.rank}${card.suite}.svg`)
    : require(`./cards/RED_BACK.svg`);
  return (
    <img
      alt={"Card" + (card ? ` ${card.suite}${card.rank}` : "")}
      className={"card" + (highlight ? " highlight" : "")}
      src={image}
    />
  );
};

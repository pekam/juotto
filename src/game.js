const { initDeck } = require("./deck-utils.js");

module.exports = class Game {
  constructor() {
    this.deck = initDeck();
    console.log(this.deck);
    console.log(this.deck.length);
  }
};

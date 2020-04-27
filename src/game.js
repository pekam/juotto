const { initDeck, drawHand } = require("./deck-utils.js");

const CARDS_PER_HAND = 3;

module.exports = {
  initGame(clients) {
    const initialDeck = initDeck();

    return clients.reduce(
      (acc, client) => {
        const { hand, deck } = drawHand(acc.deck, CARDS_PER_HAND);
        return {
          deck,
          clients: acc.clients.concat({ ...client, hand }),
        };
      },
      { deck: initialDeck, clients: [] }
    );
  },
  setReady(clientId, game) {
    const clients = game.clients.map((client) =>
      client.id === clientId ? { ...client, ready: true } : client
    );
    const allReady = clients.every((client) => client.ready);
    return {
      ...game,
      clients: allReady
        ? clients.map((client) => ({ ...client, ready: false }))
        : clients,
    };
  },
};

const { initDeck, drawHand } = require("./deck-utils.js");

const CARDS_PER_HAND = 3;

const ACTIONS = [
  "DRINK_1",
  "DRINK_2",
  "DRINK_3",
  "DECIDE_1",
  "DECIDE_2",
  "DECIDE_3",
];
const FINAL_ACTION = "DRINK_5";

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
    if (allReady && game.deck.length) {
      return drawCard(game);
    } else {
      return {
        ...game,
        clients,
      };
    }
  },
};

const drawCard = (game) => {
  return {
    ...game,
    activeCard: game.deck[0],
    action: getNextAction(game),
    deck: game.deck.slice(1, game.deck.length),
    clients: clearReady(game.clients),
  };
};

const clearReady = (clients) => {
  return clients.map((client) => ({ ...client, ready: false }));
};

const getNextAction = (game) => {
  if (game.deck.length === 1) {
    return FINAL_ACTION;
  } else {
    const index = (ACTIONS.indexOf(game.action) + 1) % ACTIONS.length;
    return ACTIONS[index];
  }
};

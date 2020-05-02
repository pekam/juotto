const { initDeck, drawHand } = require("./deck-utils.js");

const CARDS_PER_HAND = 3;

const ACTIONS = [
  { type: "drink", n: "1" },
  { type: "drink", n: "2" },
  { type: "drink", n: "3" },
  { type: "decide", n: "1" },
  { type: "decide", n: "2" },
  { type: "decide", n: "3" },
];
const FINAL_ACTION = { type: "drink", n: "5" };

module.exports = {
  initGame(state) {
    const initialDeck = initDeck();

    const { deck, clients } = state.clients.reduce(
      (acc, client) => {
        const { hand, deck } = drawHand(acc.deck, CARDS_PER_HAND);
        return {
          deck,
          clients: acc.clients.concat({ ...client, hand }),
        };
      },
      { deck: initialDeck, clients: [] }
    );
    return { ...state, deck, clients };
  },
  setReady(clientId, state) {
    const clients = state.clients.map((client) =>
      client.id === clientId ? { ...client, ready: true } : client
    );
    const allReady = clients.every((client) => client.ready);
    if (allReady && state.deck.length) {
      return drawCard(state);
    } else {
      return {
        ...state,
        clients,
      };
    }
  },
};

const drawCard = (state) => {
  return {
    ...state,
    activeCard: state.deck[0],
    action: getNextAction(state),
    deck: state.deck.slice(1, state.deck.length),
    clients: clearReady(state.clients),
  };
};

const clearReady = (clients) => {
  return clients.map((client) => ({ ...client, ready: false }));
};

const getNextAction = (state) => {
  if (state.deck.length === 1) {
    return FINAL_ACTION;
  } else {
    const index = (ACTIONS.indexOf(state.action) + 1) % ACTIONS.length;
    return ACTIONS[index];
  }
};

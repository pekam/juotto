module.exports = {
  initDeck: () => {
    const ranks = [...Array(13).keys()].map((i) => i + 1);
    const suites = ["S", "C", "H", "D"];

    return (
      suites
        .flatMap((suite) => ranks.map((rank) => ({ suite, rank })))
        // shuffle:
        .sort(() => Math.random() - 0.5)
    );
  },
};

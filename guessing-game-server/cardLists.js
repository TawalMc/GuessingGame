const shuffle = require("lodash.shuffle");

const CARD_SIZE = 8;

const cardEmoji = (valueWant) => {
  let cardsEmoji = [
    {
      emoji: "😎",
      value: 1,
    },
    {
      emoji: "😍",
      value: 2,
    },
    {
      emoji: "🤩",
      value: 3,
    },
    {
      emoji: "🤣",
      value: 4,
    },
    {
      emoji: "🤨",
      value: 5,
    },
    {
      emoji: "😒",
      value: 6,
    },
    {
      emoji: "🤬",
      value: 7,
    },
    {
      emoji: "😡",
      value: 8,
    },
  ];

  return cardsEmoji.find((card) => card.value === valueWant)?.emoji;
};

const cardListGenerator = (nbCardsRoot = CARD_SIZE) => {
  function mapInitialiser(_, index) {
    let Card = {
        value: (index % nbCardsRoot) + 1,
        pos: index,
        emoji: cardEmoji((index % nbCardsRoot) + 1),
        currentEmoji: false,
        visibility: true
      }

      return Card;
  }
  
    let arrayCard = Array.from(
    {
      length: nbCardsRoot ** 2,
    },
    mapInitialiser
  );

  return shuffle(arrayCard);
};

module.exports = { cardListGenerator, CARD_SIZE };
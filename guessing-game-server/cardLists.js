const shuffle = require("lodash.shuffle");

const CARD_SIZE = 8;

const cardEmoji = (valueWant) => {
  let cardsEmoji = [
    {
      emoji: "๐",
      value: 1,
    },
    {
      emoji: "๐",
      value: 2,
    },
    {
      emoji: "๐คฉ",
      value: 3,
    },
    {
      emoji: "๐คฃ",
      value: 4,
    },
    {
      emoji: "๐คจ",
      value: 5,
    },
    {
      emoji: "๐",
      value: 6,
    },
    {
      emoji: "๐คฌ",
      value: 7,
    },
    {
      emoji: "๐ก",
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
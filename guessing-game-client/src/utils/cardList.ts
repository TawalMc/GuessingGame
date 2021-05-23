/* import shuffle from "lodash.shuffle";


const cardEmoji = (valueWant: number) => {
  let cardsEmoji: Array<{ emoji: string; value: number }> = [
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
*/

const CARD_SIZE = 8;
export interface CardInfos {
  value: number;
  pos: number;
  emoji?: string;
  currentEmoji: boolean,
  visibility: boolean
}

/* const cardListGenerator = (nbCardsRoot: number = CARD_SIZE) => {
  function mapInitialiser(_: any, index: number) {
    let Card: CardInfos = {
        value: (index % nbCardsRoot) + 1,
        pos: index,
        emoji: cardEmoji((index % nbCardsRoot) + 1),
        currentEmoji: false
      }

      return Card;
  }
  
    let arrayCard: Array<CardInfos> = Array.from(
    {
      length: nbCardsRoot ** 2,
    },
    mapInitialiser
  );

  return shuffle(arrayCard);
};
 */
export { CARD_SIZE };
/** SET specific logic */
import { COLORS, FILLS, SHAPES, NUMBERS } from "./constants";
import { shuffle } from "lodash";

const PROPERTIES = ["color", "fill", "shape", "number"];

const shuffledDeck = () => {
  const DECK = [];

  for (const color of COLORS) {
    for (const fill of FILLS) {
      for (const shape of SHAPES) {
        for (const number of NUMBERS) {
          const id = `${color}_${fill}_${shape}_${number}`;
          const card = { color, fill, shape, number, id };
          DECK.push(card);
        }
      }
    }
  }

  return shuffle(DECK);
}

/** Check if all values are the same */
const isAllSame = values => {
  if (values.length === 0) return false;
  const value = values[0];

  for (let v of values) {
    if (v !== value) {
      return false;
    }
  }
  return true;
};

/** Check if all values are different */
const isAllDifferent = values => {
  const seen = {};
  for (let v of values) {
    if (v in seen) {
      return false;
    }
    seen[v] = true;
  }
  return true;
};

/**
 * Given a set of 3 cards, check whether or not it's a set
 * @param cards: 3 cards
 * @returns boolean
 */
const isSet = cards => {
  for (let property of PROPERTIES) {
    const values = cards.map(c => c[`${property}`]);
    const valid = isAllSame(values) || isAllDifferent(values);
    if (!valid) {
      return false;
    }
  }
  return true;
};

export { shuffledDeck, isAllSame, isAllDifferent, isSet };

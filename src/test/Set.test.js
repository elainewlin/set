import {
  createCard,
  isAllSame,
  isAllDifferent,
  isSet
} from "../Set";
import {
  COLORS,
  FILLS,
  SHAPES,
  NUMBERS
} from "../constants"
import assert from "assert";

describe("isAllSame", () => {
  it("returns true when all values are the same", () => {
    const result = isAllSame([1,1,1]);
    assert.equal(result, true);
  });

  it("returns false when a value is different", () => {
    const results = [
      isAllSame([1,1,2]),
      isAllSame([1,2,1]),
      isAllSame([2,1,1]),
      isAllSame([2,1,3])
    ]
    results.forEach(result => assert.equal(result, false));
  });
})

describe("isAllDifferent", () => {
  it("returns true when all values are different", () => {
    const result = isAllDifferent([2,1,3]);
    assert.equal(result, true);
  })

  it ("returns false when 2 values are the same", () => {
    const results = [
      isAllDifferent([1,1,2]),
      isAllDifferent([1,2,1]),
      isAllDifferent([2,1,1]),
    ]
    results.forEach(result => assert.equal(result, false));
  })

  it ("returns false when all values are the same", () => {
    const result = isAllDifferent([1,1,1]);
    assert.equal(result, false);
  })
})

describe.only("isSet", () => {
  it("returns true when there's a set", () => {
    const card1 = createCard({
      color: COLORS[0],
      fill: FILLS[0],
      shape: SHAPES[0],
      number: NUMBERS[0]
    });
    const card2 = createCard({
      color: COLORS[0],
      fill: FILLS[2],
      shape: SHAPES[0],
      number: NUMBERS[1]
    });
    const card3 = createCard({
      color: COLORS[0],
      fill: FILLS[1],
      shape: SHAPES[0],
      number: NUMBERS[2]
    });
    const group = [card1, card2, card3];
    assert.equal(isSet(group), true);
  });

  it("returns false when there's no set", () => {
    const card1 = createCard({
      color: COLORS[0],
      fill: FILLS[0],
      shape: SHAPES[0],
      number: NUMBERS[0]
    });
    const card2 = createCard({
      color: COLORS[0],
      fill: FILLS[2],
      shape: SHAPES[0],
      number: NUMBERS[1]
    });
    const card3 = createCard({
      color: COLORS[0],
      fill: FILLS[2],
      shape: SHAPES[0],
      number: NUMBERS[2]
    });
    const group = [card1, card2, card3];
    assert.equal(isSet(group), false);
  });
});
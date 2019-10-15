import {isAllSame,
  isAllDifferent,
  isSet} from "../Set";
import {COLORS} from "../constants"
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

describe("isSet", () => {


});
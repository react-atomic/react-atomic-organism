import { expect } from "chai";

import { stringToArray, oneItemArrayToString } from "../index";

describe("Test stringToArray", () => {
  it("test to array", () => {
    const vals = [0, 1, "0", "1", null, undefined, ""];
    const to = [[0], [1], ["0"], ["1"], [null], [], [""]];
    vals.forEach((v, index) => {
      expect(stringToArray(vals[index])).to.deep.equal(to[index]);
    });
  });

  it("test will keep same", () => {
    const vals = [{}, []];
    vals.forEach((v, index) => {
      expect(stringToArray(vals[index])).to.deep.equal(vals[index]);
    });
  });

  it("test null", () => {
    const val = null;
    const valToArray = stringToArray(val);
    const valToString = oneItemArrayToString(valToArray);
    expect([valToArray, valToString]).to.deep.equal([[null], null]);
  });

  it("test undefined", () => {
    const val = undefined;
    const valToArray = stringToArray(val);
    const valToString = oneItemArrayToString(valToArray);
    expect([valToArray, valToString]).to.deep.equal([[], undefined]);
  });

  it("test not defined", () => {
    let val;
    const valToArray = stringToArray(val);
    const valToString = oneItemArrayToString(valToArray);
    expect([valToArray, valToString]).to.deep.equal([[], undefined]);
  });

  it("test not assign valToArray", () => {
    const valToArray = stringToArray();
    const valToString = oneItemArrayToString(valToArray);
    expect([valToArray, valToString]).to.deep.equal([[], undefined]);
  });

  it("test not assign both", () => {
    const valToArray = stringToArray();
    const valToString = oneItemArrayToString(valToArray);
    expect([valToArray, valToString]).to.deep.equal([[], undefined]);
  });
});

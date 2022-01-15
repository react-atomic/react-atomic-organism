import { expect } from "chai";

import toArray from "../index";

describe("Test any-to-array", () => {
  it("conver array", () => {
    const actual = toArray([0]);
    expect(actual).to.deep.equal([0]);
  });

  it("conver non-array", () => {
    const actual = toArray(0);
    expect(actual).to.deep.equal([0]);
  });

  it("pass empty (undefined)", () => {
    const actual = toArray();
    expect(actual).to.deep.equal([]);
  });

  it("pass null", () => {
    const actual = toArray(null);
    expect(actual).to.deep.equal([null]);
  });
});

import { expect } from "chai";

import toArray from "../index";

describe("Test to-array-js", () => {
  it("conver array", () => {
    const actual = toArray([0]);
    expect(actual).to.deep.equal([0]);
  });

  it("conver non-array", () => {
    const actual = toArray(0);
    expect(actual).to.deep.equal([0]);
  });

  it("pass empty", () => {
    const actual = toArray();
    expect(actual).to.deep.equal([]);
  });
});

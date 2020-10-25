import { expect } from "chai";

import { toArray } from "../index.js";

describe("Test toStringForOneArray", () => {
  it("basic test", () => {
    const a = "foo";
    expect(toArray(a)).to.deep.equal(["foo"]);
  });

  it("test assign array", () => {
    const a = ["foo"];
    expect(toArray(a)).to.deep.equal(["foo"]);
  });
});

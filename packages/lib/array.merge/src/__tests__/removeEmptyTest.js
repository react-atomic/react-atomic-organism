import { expect } from "chai";

import { removeEmpty } from "../index";

describe("Test remove empty", () => {
  it("test array", () => {
    const arr = ["", null, false, 0, undefined, {}, [], "0", "a"];
    expect(removeEmpty(arr)).to.deep.equal([{}, [], "0", "a"]);
  });
  it("test object", () => {
    const arr = {
      a: "",
      b: null,
      c: "a",
    };
    expect(removeEmpty(arr)).to.deep.equal({ c: "a" });
  });
  it("test undefined only", () => {
    const arr = ["", null, false, 0, undefined, {}, [], "0", "a"];
    expect(removeEmpty(arr, true)).to.deep.equal([
      "",
      null,
      false,
      0,
      {},
      [],
      "0",
      "a",
    ]);
  });
  it("test exclude key", () => {
    const arr = { a: "a", b: 1 };
    expect(removeEmpty(arr, null, ["b"])).to.deep.equal({ a: "a" });
  });

  it("test null only", () => {
    const arr = ["a", undefined, null, false];
    expect(removeEmpty(arr, (v) => null != v)).to.deep.equal(["a", false]);
  });
});

"use strict";

import { expect } from "chai";

import dedup from "../index.js";

describe("test dedup", () => {
  it("should dedup with a,b,a", () => {
    const a = ["a", "b", "a"];
    const acture = dedup(a);
    expect(acture).to.deep.equal(["a", "b"]);
  });
  it("should dedup with a,a,a", () => {
    const a = ["a", "a", "a"];
    const acture = dedup(a);
    expect(acture).to.deep.equal(["a"]);
  });
  it("should dedup with a,a,b", () => {
    const a = ["a", "a", "b"];
    const acture = dedup(a);
    expect(acture).to.deep.equal(["a", "b"]);
  });
  it("should dedup with b,a,a", () => {
    const a = ["b", "a", "a"];
    const acture = dedup(a);
    expect(acture).to.deep.equal(["b", "a"]);
  });
});

"use strict";

import { expect } from "chai";

import dedup from "../index";

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

  describe("test dedup reverse", () => {
    it("should dedup with c,a,b,a", () => {
      const a = ["c", "a", "b", "a"];
      const acture = dedup(a, true);
      expect(acture).to.deep.equal(["c", "b", "a"]);
    });
  });

  describe("test dedup with object", () => {
    it("should dedup object", () => {
      const a = [
        { key: "aa", bar: "a" },
        { key: "bb", bar: "b" },
        { key: "aa", bar: "c" },
      ];
      const acture = dedup(a, true, (i) => i.key);
      expect(acture).to.deep.equal([
        { key: "bb", bar: "b" },
        { key: "aa", bar: "c" },
      ]);
    });
  });
});

import { expect } from "chai";

import sortCompare from "../sortCompare";

describe("SortCompare Test", () => {
  const d = [
    {
      col: 1,
    },
    {
      col: 3,
    },
    {
      col: 2,
    },
  ];
  const s = [
    {
      col: "a",
    },
    {
      col: "c",
    },
    {
      col: "b",
    },
  ];
  it("test asc sort", () => {
    expect(d.sort(sortCompare("col"))).to.deep.equal([
      { col: 1 },
      { col: 2 },
      { col: 3 },
    ]);
  });
  it("test desc sort", () => {
    expect(d.sort(sortCompare("col", 1))).to.deep.equal([
      { col: 3 },
      { col: 2 },
      { col: 1 },
    ]);
  });
  it("test asc sort with string", () => {
    expect(s.sort(sortCompare("col"))).to.deep.equal([
      { col: "a" },
      { col: "b" },
      { col: "c" },
    ]);
  });
  it("test desc sort with string", () => {
    expect(s.sort(sortCompare("col", 1))).to.deep.equal([
      { col: "c" },
      { col: "b" },
      { col: "a" },
    ]);
  });
});

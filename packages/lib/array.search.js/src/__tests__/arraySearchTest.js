import { expect } from "chai";

import arraySearch, { arraySearchFirst } from "../arraySearch";

describe("Test Array Search", () => {
  it("basic test", () => {
    const arr = [
      {},
      { a: ["xxx"] },
      {
        a: "foo",
      },
      {
        a: "bar",
      },
    ];
    expect(arraySearch(arr)({ a: "BAR" })).to.deep.equal([{ a: "bar" }]);
    expect(arraySearchFirst(arr)({ a: "BAR" })).to.deep.equal({ a: "bar" });
  });

  it("test match mutiple", () => {
    const arr = [
      {},
      { a: ["xxx"] },
      {
        a: "foo",
      },
      {
        a: "bar",
      },
      {
        a: "bar",
        b: "foo",
      },
      {
        a: "bar",
        b: "foo",
        c: "any",
      },
    ];
    const all = arraySearch(arr)({ a: "BAR", b: "Foo" });
    const first = arraySearchFirst(arr)({ a: "BAR", b: "Foo" });
    expect(all).to.deep.equal([
      { a: "bar", b: "foo" },
      { a: "bar", b: "foo", c: "any" },
    ]);

    expect(first).to.deep.equal({ a: "bar", b: "foo" });
  });

  it("test without key", () => {
    const arr = ["FOO", "BAR"];
    expect(arraySearch(arr)("f")).to.deep.equal(["FOO"]);
    expect(arraySearchFirst(arr)("f")).to.equal("FOO");
  });

  it("test number and without key", () => {
    const arr = [111, 222];
    expect(arraySearchFirst(arr, true)(111)).to.equal(111);
    expect(arraySearchFirst(arr, true)(1)).to.equal(false);
  });

  it("test with exact", () => {
    const arr = ["a", "bbb", "aa"];
    const acture1 = arraySearch(arr)("a");
    const acture2 = arraySearch(arr, true)("a");
    expect(acture1.length).to.equal(2);
    expect(acture2.length).to.equal(1);
  });
});

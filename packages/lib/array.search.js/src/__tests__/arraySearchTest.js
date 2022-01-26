import { expect } from "chai";

import arraySearch, { arraySearchFirst, arraySearchLast } from "../arraySearch";

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
    expect(arraySearchLast(arr)({ a: "BAR" })).to.deep.equal({ a: "bar" });
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
    const last = arraySearchLast(arr)({ a: "BAR", b: "Foo" });

    expect(all).to.deep.equal([
      { a: "bar", b: "foo" },
      { a: "bar", b: "foo", c: "any" },
    ]);

    expect(first).to.deep.equal({ a: "bar", b: "foo" });
    expect(last).to.deep.equal({ a: "bar", b: "foo", c: "any" });
  });

  it("test without key", () => {
    const arr = ["FOO", "BAR", "foo1"];
    expect(arraySearch(arr)("f")).to.deep.equal(["FOO", "foo1"]);
    expect(arraySearchFirst(arr)("f")).to.equal("FOO");
    expect(arraySearchLast(arr)("f")).to.equal("foo1");
  });

  it("test number and without key", () => {
    const arr = [111, 222, "111"];
    expect(arraySearchFirst(arr, true)(111)).to.equal(111);
    expect(arraySearchFirst(arr, true)(1)).to.equal(false);
    expect(arraySearchLast(arr, true)(111)).to.equal("111");
  });

  it("test with exact match", () => {
    const arr = ["a", "bbb", "aa"];
    const acture1 = arraySearch(arr)("a");
    const acture2 = arraySearch(arr, true)("a");
    expect(acture1.length).to.equal(2);
    expect(acture2.length).to.equal(1);
  });
});

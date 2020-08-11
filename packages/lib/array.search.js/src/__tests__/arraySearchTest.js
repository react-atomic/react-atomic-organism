import { expect } from "chai";

import arraySearch from "../index";

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
    const acture = arraySearch(arr)({ a: "BAR" });
    expect(acture).to.deep.equal([{ a: "bar" }]);
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
    const acture = arraySearch(arr)({ a: "BAR", b: "Foo" });
    expect(acture).to.deep.equal([
      { a: "bar", b: "foo" },
      { a: "bar", b: "foo", c: "any" },
    ]);
  });

  it("test without key", () => {
    const arr = ["FOO", "BAR"];
    const acture = arraySearch(arr)("f");
    expect(acture).to.deep.equal(["FOO"]);
  });

  it("test with exact", () => {
    const arr = ["a", "bbb", "aa"];
    const acture1 = arraySearch(arr)("a");
    const acture2 = arraySearch(arr, true)("a");
    expect(acture1.length).to.equal(2);
    expect(acture2.length).to.equal(1);
  });
});

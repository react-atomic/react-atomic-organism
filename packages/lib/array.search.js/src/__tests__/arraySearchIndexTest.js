import { expect } from "chai";

import arraySearchIndex from "../arraySearchIndex";

describe("Test Array Search Index", () => {
  it("basic test", () => {
    const arr = [
      {
        foo: "bar",
        other: "fake",
      },
      {
        foo: "bar1",
      },
    ];
    const store = {};
    const result = arraySearchIndex(arr)(["foo"], store);
    expect(store.current).to.deep.equal({
        foo: "bar",
        other: "fake",
    });
    expect(result).to.equal("bar");
  });

  it("test search all", () => {
    const arr = [
      {
        foo: "bar",
        other: "x1",
      },
      {
        foo: "bar1",
        other: "x2",
      },
      {
        bar: "fake",
      },
    ];
    const store = {};
    const result = arraySearchIndex(arr, {all: true})(["foo"], store);
    expect(result).to.deep.equal(["bar", "bar1"]);
  });

  it("test clone", () => {
    const arr = [
      {
        foo: {bar: "a"},
      },
    ];
    const result = arraySearchIndex(arr)(["foo"]);
    expect(result).to.deep.equal({bar: "a"});
    result.bar = "b";
    expect(arr[0]).to.deep.equal({foo: {bar: "a"}});
  });

  it("test not clone", () => {
    const arr = [
      {
        foo: {bar: "a"},
      },
    ];
    const result = arraySearchIndex(arr, {clone: false})(["foo"]);
    expect(result).to.deep.equal({bar: "a"});
    result.bar = "b";
    expect(arr[0]).to.deep.equal({foo: {bar: "b"}});
  });

  it("test backfill", () => {
    const arr = [
      {
        a: 1,
      },
      {
        b: 2,
      },
      {
        a: 3,
      },
    ];
    const result = arraySearchIndex(arr, {backfill: true})(["a"]);
    expect(result).to.deep.equal([1, undefined, 3]);
  });
});

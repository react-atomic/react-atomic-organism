import { expect } from "chai";

import { combine, combineSub, getAllCombine } from "../index";

describe("Test array combine", () => {
  it("test combine", () => {
    const arr = {
      foo: ["a", "b", "c"],
      bar: ["d", "e", "f"],
    };
    const acture = combine(arr);
    const expected = [
      { foo: "a", bar: "d" },
      { foo: "b", bar: "e" },
      { foo: "c", bar: "f" },
    ];
    expect(acture).to.deep.equal(expected);
  });
  it("test combine with object key", () => {
    const arr = {
      foo: ["a", "b", "c"],
      bar: ["d", "e", "f"],
    };
    const acture = combine(arr, "foo");
    const expected = {
      a: { foo: "a", bar: "d" },
      b: { foo: "b", bar: "e" },
      c: { foo: "c", bar: "f" },
    };
    expect(acture).to.deep.equal(expected);
  });
  it("not array", () => {
    const acture = combine(null);
    expect(acture).to.be.undefined;
  });
});

describe("Test combine sub", () => {
  const subArr = {
    someSubKey: {
      foo: ["a"],
      bar: ["d"],
    },
  };
  it("test combine sub", () => {
    const arr = [{ somekey: "someSubKey" }];
    const acture = combineSub(arr, subArr, "somekey");
    const expected = [{ somekey: [{ foo: "a", bar: "d" }] }];
    expect(acture).to.deep.equal(expected);
  });
  it("test sub key not exists", () => {
    const arr = [{ somekey: "xxx" }];
    const acture = combineSub(arr, subArr, "somekey");
    const expected = [{ somekey: null }];
    expect(acture).to.deep.equal(expected);
  });
});

describe("Test getAllCombine", () => {
  it("basic test", () => {
    const arr = {
      foo: ["a", "b", "c"],
      bar: ["d", "e", "f"],
    };
    const acture = getAllCombine(arr);
    const expected = {
      foo: {
        a: { foo: "a", bar: "d" },
        b: { foo: "b", bar: "e" },
        c: { foo: "c", bar: "f" },
      },
      bar: {
        d: { foo: "a", bar: "d" },
        e: { foo: "b", bar: "e" },
        f: { foo: "c", bar: "f" },
      },
    };
    expect(acture).to.deep.equal(expected);
  });
});

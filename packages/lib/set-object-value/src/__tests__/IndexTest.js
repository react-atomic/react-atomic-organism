import set, { unsafeSet } from "../index.js";
import { expect } from "chai";

describe("Test set", () => {
  it("check set result", () => {
    const obj = {};
    set(obj, ["a", "b"], "c");
    expect(obj).to.deep.equal({ a: { b: "c" } });
  });
});

describe("CVE-2020-28281", () => {
  it("should not overwrite prototype", () => {
    const obj = {};
    expect(obj.isAdmin).to.be.undefined;
    expect(() => set(obj, ["__proto__", "isAdmin"], true)).to.throw();
    expect(() => set(obj, ["constructor", "isAdmin"], true)).to.throw();
    expect(() => set(obj, ["prototype", "isAdmin"], true)).to.throw();
    expect(obj.isAdmin).to.be.undefined;
    set(obj, ["isAdmin"], true);
    expect(obj.isAdmin).to.be.true;
  });

  it("should force overwrite prototype with unsafe mode", () => {
    const obj = {};
    unsafeSet(obj, ["__proto__", "fake"], true);
    expect(obj.fake).to.be.true;
  });

  it("safe way with unsafe set", () => {
    const obj = Object.create(null);
    unsafeSet(obj, ["__proto__", "fake"], true);
    expect(obj.fake).to.be.undefined;
    expect(obj.__proto__.fake).to.be.true;

    const obj2 = Object.create(null);
    expect({}.fake).to.be.true; // bad case
    expect(obj2.fake).to.be.undefined;
  });
});

describe("Test append", () => {
  it("test simple append", () => {
    const obj = {};
    set(obj, ["a"], "a1", true);
    set(obj, ["a"], "a2", true);
    expect(obj).to.deep.equal({ a: ["a1", "a2"] });
  });

  it("should keep origin value", () => {
    const obj = {};
    set(obj, ["a"], "a3");
    set(obj, ["a"], "a4", true);
    expect(obj).to.deep.equal({ a: ["a3", "a4"] });
  });
});

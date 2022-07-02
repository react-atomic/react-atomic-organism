import { expect } from "chai";

import has from "../has";

describe("Test Has Object Value", () => {
  it("test has object", () => {
    const o = { foo: "bar" };
    expect(has(o, "foo")).to.be.true;
    expect(has(o, "bar")).to.be.false;
  });

  it("test has empty object", () => {
    const o = undefined;
    expect(has(o, "foo")).to.be.false;
  });

  it("test has map", () => {
    const a = {
      has: (k) => (k === "foo" ? true : false),
      size: 1,
    };
    expect(has(a, "foo")).to.be.true;
    expect(has(a, "bar")).to.be.false;
  });
});

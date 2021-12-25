import { expect } from "chai";

import ucfirst from "../index";

describe("Test ucfirst-js", () => {
  it("basic test", () => {
    const actual = ucfirst();
    expect(actual).to.be.null;
  });

  it("test null", () => {
    const actual = ucfirst(null);
    expect(actual).to.be.null;
  });

  it("test undefined", () => {
    const actual = ucfirst(undefined);
    expect(actual).to.be.null;
  });

  it("test foo", () => {
    const actual = ucfirst("foo");
    expect(actual).to.equal("Foo");
  });
});

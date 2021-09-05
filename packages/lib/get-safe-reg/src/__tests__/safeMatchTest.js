import { expect } from "chai";
import { safeMatch } from "../index.js";

describe("test safe match", () => {
  it("basic test", () => {
    const actual = safeMatch("", /1/);
    expect(actual).to.be.null;
  });

  it("test null", () => {
    const actual = safeMatch(null, /1/);
    expect(actual).to.be.null;
  });

  it("test undefined", () => {
    const actual = safeMatch(undefined, /1/);
    expect(actual).to.be.null;
  });

  it("test object", () => {
    const actual = safeMatch({}, /1/);
    expect(actual).to.be.null;
  });

  it("test int", () => {
    const actual = safeMatch(1, /1/);
    expect(actual[0]).to.equal("1");
  });

  it("test empty reg", () => {
    const actual = safeMatch(1, undefined);
    expect(actual[0]).to.equal("");
  });
});

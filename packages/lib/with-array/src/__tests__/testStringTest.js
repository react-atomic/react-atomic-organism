import { expect } from "chai";

import { testString } from "../index";

describe("Test testString", () => {
  it("input 0", () => {
    const num = 0;
    expect(testString(num)).to.be.true;
  });

  it("input 1", () => {
    const num = 1;
    expect(testString(num)).to.be.true;
  });

  it("input null", () => {
    const val = null;
    expect(testString(val)).to.be.true;
  });

  it("input undefined", () => {
    const val = undefined;
    expect(testString(val)).to.be.true;
  });

  it("input ''", () => {
    const val = "";
    expect(testString(val)).to.be.true;
  });

  it("input {}", () => {
    const val = {};
    expect(testString(val)).to.be.false;
  });

  it("input []", () => {
    const val = [];
    expect(testString(val)).to.be.false;
  });
});

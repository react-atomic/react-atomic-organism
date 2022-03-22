"use strict";

import randKey, { getSN } from "../index.js";
import { expect } from "chai";

describe("Test rand key", () => {
  it("get key", () => {
    const keys = randKey().split(".");
    expect(isNaN(keys[0])).to.false;
    expect(isNaN(keys[1])).to.false;
  });
});

describe("Test get SN", () => {
  it("basic test", () => {
    const n1 = getSN();
    const n2 = getSN();
    expect(n1).to.equal("_0");
    expect(n2).to.equal("_1");
  });
  it("get sn with name", () => {
    const n1 = getSN("foo");
    const n2 = getSN("foo");
    expect(n1).to.equal("foo_0");
    expect(n2).to.equal("foo_1");
  });
});

import { expect } from "chai";

import * as _ from "../lodash-lite";

describe("Test min", () => {
  it("min with array", () => {
    const arr = [1, 2, 3];
    expect(_.calMin(arr)).to.eql(1);
  });
  it("min with empty array", () => {
    const arr = [];
    expect(_.calMin(arr)).to.eql(0);
  });
  it("min with one param", () => {
    expect(_.calMin(2)).to.eql(2);
  });
  it("min with multi params", () => {
    expect(_.calMin(3, 5, 7)).to.eql(3);
  });
});

describe("Test max", () => {
  it("max with array", () => {
    const arr = [1, 2, 3];
    expect(_.calMax(arr)).to.eql(3);
  });
  it("max with empty array", () => {
    const arr = [];
    expect(_.calMax(arr)).to.eql(0);
  });
  it("max with one param", () => {
    expect(_.calMax(2)).to.eql(2);
  });
  it("max with multi params", () => {
    expect(_.calMax(3, 5, 7)).to.eql(7);
  });
});

describe("Test isEmpty", () => {
  it("is empty", () => {
    [null, undefined, [], {}, 0, false, ""].forEach((a) => {
      expect(_.isEmpty(a)).to.be.true;
    });
  });
});


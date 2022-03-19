import { expect } from "chai";

import * as _ from "../lodash-lite";

describe("Test min", () => {
  it("min with array", () => {
    const arr = [1, 2, 3];
    expect(_.min(arr)).to.eql(1);
  });
  it("min with empty array", () => {
    const arr = [];
    expect(_.min(arr)).to.eql(0);
  });
  it("min with one param", () => {
    expect(_.min(2)).to.eql(2);
  });
  it("min with multi params", () => {
    expect(_.min(3, 5, 7)).to.eql(3);
  });
});

describe("Test max", () => {
  it("max with array", () => {
    const arr = [1, 2, 3];
    expect(_.max(arr)).to.eql(3);
  });
  it("max with empty array", () => {
    const arr = [];
    expect(_.max(arr)).to.eql(0);
  });
  it("max with one param", () => {
    expect(_.max(2)).to.eql(2);
  });
  it("max with multi params", () => {
    expect(_.max(3, 5, 7)).to.eql(7);
  });
});

describe("Test isEmpty", () => {
  it("is empty", () => {
    [null, undefined, [], {}, 0, false, ""].forEach((a) => {
      expect(_.isEmpty(a)).to.be.true;
    });
  });
});

describe("Test get uniqueId", () => {
  it("get uniqueId", () => {
    expect(_.uniqueId("foo")).to.equal("foo_0");
    expect(_.uniqueId("foo")).to.equal("foo_1");
  });
});

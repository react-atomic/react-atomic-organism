import { expect } from "chai";
import { getSinon as sinon, cleanIt } from "reshow-unit";

import { getTimestamp, expireCallback } from "../index";

describe("Test expireCallback", () => {
  beforeEach(() => {
    sinon({useFakeTimers: true});
  });

  afterEach(() => {
    cleanIt();
  });

  it("test run", () => {
    const acture = expireCallback(
      0,
      1,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("foo");
  });

  it("test with expire", () => {
    const acture = expireCallback(
      0,
      -1,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("bar");
  });

  it("test create time not valid", () => {
    const acture = expireCallback(
      null,
      0,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("bar");
  });

  it("test expire time not valid", () => {
    const acture = expireCallback(
      0,
      null,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("foo");
  });
});

import { expect } from "chai";
import sinon from "sinon";

import {getTimestamp, expireCallback} from "../index";

describe("Test expireCallback", () => {
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
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

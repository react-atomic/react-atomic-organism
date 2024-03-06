//@ts-check
import { expect } from "chai";
import { getSinon as sinon, cleanIt } from "reshow-unit-dom";

import { expireCallback } from "../index";
/**
 * @type import("sinon").SinonFakeTimers
 */
let timer;
describe("Test expireCallback", () => {
  beforeEach(() => {
    timer = sinon({ useFakeTimers: true }).clock;
  });

  afterEach(() => {
    cleanIt();
  });

  it("test run with pass 0", () => {
    timer.tick(0);
    const acture = expireCallback(
      0,
      1,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("foo");
  });

  it("test run with pass 1", () => {
    timer.tick(1);
    const acture = expireCallback(
      0,
      1,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("foo");
  });

  it("test run with pass 2", () => {
    timer.tick(2);
    const acture = expireCallback(
      0,
      1,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("bar");
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

  it("test expire time is zero", () => {
    timer.tick(1);
    const acture = expireCallback(
      0,
      0,
      () => "foo",
      () => "bar"
    );
    expect(acture).to.equal("bar");
  });
});

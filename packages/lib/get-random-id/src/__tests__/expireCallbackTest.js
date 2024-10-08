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

  it("test with expire", () => {
    const acture = expireCallback(
      0,
      -1,
      () => "not expire",
      () => "expire"
    );
    expect(acture).to.equal("expire");
  });

  it("test create time not valid", () => {
    timer.tick(0);
    const acture = expireCallback(
      null,
      0,
      () => "not expire",
      () => "expire"
    );
    expect(acture).to.equal("expire");
  });

  it("test expire time not valid", () => {
    const acture = expireCallback(
      0,
      null,
      () => "not expire",
      () => "expire"
    );
    expect(acture).to.equal("expire");
  });

  describe("Test expire time is set to one", () => {
    it("test time pass 0 sec", () => {
      timer.tick(0);
      const acture = expireCallback(
        0,
        1,
        () => "not expire",
        () => "expire"
      );
      expect(acture).to.equal("not expire");
    });

    it("test time pass 1 sec", () => {
      timer.tick(1);
      const acture = expireCallback(
        0,
        1,
        () => "not expire",
        () => "expire"
      );
      expect(acture).to.equal("not expire");
    });

    it("test time pass 2 sec", () => {
      timer.tick(2);
      const acture = expireCallback(
        0,
        1,
        () => "not expire",
        () => "expire"
      );
      expect(acture).to.equal("expire");
    });
  });

  describe("Test expire time is set to zero", () => {
    it("pass 0 sec", () => {
      timer.tick(0);
      const acture = expireCallback(
        0,
        0,
        () => "not expire",
        () => "expire"
      );
      expect(acture).to.equal("not expire");
    });

    it("pass 1 sec", () => {
      timer.tick(1);
      const acture = expireCallback(
        0,
        0,
        () => "not expire",
        () => "expire"
      );
      expect(acture).to.equal("expire");
    });
  });
});

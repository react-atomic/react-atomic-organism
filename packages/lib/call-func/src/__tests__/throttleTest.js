import { expect } from "chai";
import { getSinon as sinon } from "reshow-unit-dom";
import throttle from "../throttle";

describe("Test throttle", () => {
  it("test throttle", (done) => {
    const spy = sinon().spy();
    const run = throttle(spy, 2);

    for (let i = 0; i < 2; i++) {
      setTimeout(() => run(), i * 1);
    }

    setTimeout(() => {
      expect(spy.callCount).to.equal(1);
      done();
    }, 100);
  });

  it("test throttle with last run", (done) => {
    const spy = sinon().spy();
    const run = throttle(spy, 2, true);

    for (let i = 0; i < 2; i++) {
      setTimeout(() => run(), i * 1);
    }

    setTimeout(() => {
      expect(spy.callCount).to.equal(2);
      done();
    }, 100);
  });
});

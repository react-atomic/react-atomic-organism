import { expect } from "chai";
import { getSinon as sinon } from "reshow-unit-dom";
import debounce from "../debounce";
describe("Test debounce", () => {
  it("test debounce", (done) => {
    const spy = sinon().spy();
    const run = debounce(spy, 10);
    for (let i = 0; i < 5; i++) {
      run();
    }
    setTimeout(() => {
      expect(spy.callCount).to.equal(1);
      done();
    }, 100);
  });
});

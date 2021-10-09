import { expect } from "chai";
import sinon from "sinon";
import Router from "../index";

describe("Test Router with reg", () => {
  it("basic test", ()=>{
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute(/abc/, cb);
    const match = router.match("abc");
    match.fn();
    expect(cb.callCount).to.equal(1);
  });
});


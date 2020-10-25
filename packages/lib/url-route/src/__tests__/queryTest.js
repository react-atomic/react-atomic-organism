import { expect } from "chai";
import sinon from "sinon";
import Router from "../index";

describe("Test Router with Query", () => {
  it("Test query match", () => {
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute("http://abc/?a=??&b=foo", cb);
    const match = router.match("https://abc/?a=12&b=foo");
    expect(null != match).to.be.true;
  });

  it("Test query not exists", () => {
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute("http://abc/?a=?&b=foo", cb);
    const match = router.match("https://abc/?b=foo");
    expect(null == match).to.be.true;
    const match2 = router.match("https://abc/?b=foo&a=b");
    expect(null != match2).to.be.true;
  });
});

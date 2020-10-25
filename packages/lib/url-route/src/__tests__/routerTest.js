import { expect } from "chai";
import sinon from "sinon";
import Router from "../index";

describe("Test Router", () => {
  it("simple test", () => {
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute("/xxx*", cb);
    const match = router.match("/xxxy");
    expect(cb.called).to.be.false;
    match.fn();
    expect(cb.called).to.be.true;
    const next = match.next();
    expect(!!next).to.be.false;
  });

  it("root only test", () => {
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute("/", cb);
    const match = router.match("/?abc=def#foo");
    expect(cb.called).to.be.false;
    match.fn();
    expect(cb.called).to.be.true;
  });

  it("complex case", () => {
    const router = new Router();
    router.addRoute("/:controller/:action/:id.:format/*/*", () => {});
    const match = router.match("/posts/show/1.json/abc/def");
    expect(match.params).to.deep.equal({
      controller: "posts",
      action: "show",
      id: "1",
      format: "json",
    });
    expect(match.splats).to.deep.equal(["abc", "def"]);
  });
});

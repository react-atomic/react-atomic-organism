//@ts-check
import { expect } from "chai";
import { forEachMap } from "../toMap";
import { SimpleMap } from "reshow-map";

describe("Test forEachMap", () => {
  it("forEach SimpleMap", () => {
    const o = new SimpleMap({ foo: "bar", foo1: "bar1" });
    let s = "";
    forEachMap(o, (/**@type any*/ v, /**@type any*/ k) => {
      s += `${v}${k}-`;
    });
    expect(s).to.equal("barfoo-bar1foo1-");
  });

  it("forEach object", () => {
    const o = { foo2: "bar2", foo3: "bar3" };
    let s = "";
    forEachMap(o, (/**@type any*/ v, /**@type any*/ k) => {
      s += `${v}${k}-`;
    });
    expect(s).to.equal("bar2foo2-bar3foo3-");
  });
});

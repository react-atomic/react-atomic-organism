//@ts-check
import { expect } from "chai";
import { setMap } from "../toMap";
import { SimpleMap } from "reshow-map";

describe("Test setMap", () => {
  it("set SimpleMap", () => {
    let o = new SimpleMap({});
    o = setMap(o, "foo", "bar");
    expect(o.get("foo")).to.equal("bar");
  });

  it("set object", () => {
    const o = {};
    setMap(o, "foo1", "bar1");
    expect(o.foo1).to.equal("bar1");
  });
});

import { expect } from "chai";
import initMap from "../initMap";

describe("Test initMap", () => {
  it("test anonymous and return value", () => {
    const acture = initMap({})("foo", "bar");
    expect(acture).to.equal("bar");
  });
  it("test anonymous with two step", () => {
    const cb = initMap({});
    cb("foo", "bar2");
    expect(cb("foo")).to.equal("bar2");
  });
  it("test with external", () => {
    const fakeMap = {};
    const cb = initMap(fakeMap);
    cb("foo", "bar2");
    expect(fakeMap).to.deep.equal({ foo: "bar2" });
  });
  it("test intiMap return value", () => {
    const fakeMap = {};
    const foo = initMap(fakeMap)("foo", []);
    foo.push("bar");
    expect(foo).to.deep.equal(["bar"]);
    expect(fakeMap).to.deep.equal({ foo: ["bar"] });
  });
});

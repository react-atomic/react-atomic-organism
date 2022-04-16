import { expect } from "chai";
import initMap from "../initMap";

describe("Test initMap", () => {
  it("test anonymous and return value", () => {
      const acture = initMap({})('foo', 'bar');
      expect(acture).to.equal("bar");
  });
  it("test anonymous with two step", () => {
      const cb = initMap({});
      cb('foo', 'bar2')
      expect(cb('foo')).to.equal("bar2");
  });
  it("test with external", () => {
      let fakeMap = {};
      const cb = initMap(fakeMap);
      cb('foo', 'bar2')
      expect(fakeMap).to.deep.equal({foo: "bar2"});
  });
});

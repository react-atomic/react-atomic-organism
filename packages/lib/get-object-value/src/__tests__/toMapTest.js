import { expect } from "chai";
import toMap from "../toMap";
import { SimpleMap } from "reshow-map";

describe("Test toMap", () => {
  it("test toMap", () => {
    const map = {
      a: {
        toJS: () => "foo",
      },
      b: {
        toJS: () => "bar",
      },
    };
    expect(toMap(map)).to.deep.equal({
      a: "foo",
      b: "bar",
    });
  });

  it("test with immutable map", () => {
    const map = [{ toJS: () => "foo" }, { toJS: () => "bar" }];
    const actual = toMap(map);
    expect(actual).to.deep.equal({ 0: "foo", 1: "bar" });
  });

  it("test with SimpleMap", ()=>{
    const data = {a: "aa", b: "bb"};
    const map = new SimpleMap(data);
    const actual = toMap(map);
    expect(actual).to.deep.equal(data);
  });
});

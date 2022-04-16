import { expect } from "chai";
import toJS from "../toJS";

describe("Test toJS", () => {
  it("test without toJS", () => {
    const o = {foo: "bar"};
    expect(toJS(o)).to.deep.equal({
      foo: "bar"
    });
  });
  it("test has toJS", () => {
    const o = {
      foo1: "bar1",
      foo2: "bar2",
      toJS: () => Object.keys(o).filter(v => v!=="toJS")
    };
    expect(toJS(o)).to.deep.equal(["foo1", "foo2"]);
  });
});

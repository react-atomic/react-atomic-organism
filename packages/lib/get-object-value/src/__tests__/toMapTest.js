import { expect } from "chai";
import toMap from "../toMap";

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
});

import { expect } from "chai";

import get, { toMap } from "../index.js";

describe("Test Get Object Value", () => {
  it("test get", () => {
    const a = {
      foo: {
        bar: {
          key: "v",
        },
      },
    };
    const acture = get(a, ["foo", "bar", "key"]);
    expect(acture).to.equal("v");
  });

  it("test null", () => {
    const a = {
      foo: {
        bar: {
          key: null,
        },
      },
    };
    const acture = get(a, ["foo", "bar", "key"]);
    expect(acture).to.equal(null);
  });


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

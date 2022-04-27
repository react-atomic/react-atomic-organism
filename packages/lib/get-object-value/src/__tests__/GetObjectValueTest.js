import { expect } from "chai";

import get from "../get";

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

  it("test with null", () => {
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

  it("test with number", () => {
    const a = {
      foo: 111,
    };
    const acture = get(a, ["foo", "bar"]);
    expect(acture).to.equal(undefined);
  });

  it("test get map", () => {
    const a = {
      get: () => ({
        b: {
          c: {
            get: () => "d",
          },
        },
      }),
    };
    const acture = get(a, ["foo-any", "b", "c", "foo-any"]);
    expect(acture).to.equal("d");
  });
});

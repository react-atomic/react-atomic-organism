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
    expect(acture).to.be.undefined;
    expect(get(1, ["foo"])).to.be.undefined;
    expect(get(1, [0])).to.be.undefined;
    expect(get("1", [0])).to.equal("1");
  });


  it("test get map", () => {
    const a = {
      get: () => ({
        b: {
          c: {
            get: () => "d",
            size: 1,
          },
        },
      }),
      size: 1,
    };
    const acture = get(a, ["foo-any", "b", "c", "foo-any"]);
    expect(acture).to.equal("d");
  });

  it( "test get is not function ", () => { 
    const a = {
      get: "foo",
      size: 999,
    };
    const acture = get(a, ["size"]);
    expect(acture).to.equal(999);
  });

  it("test path is not array", () => {
    const acture = ()=>get("foo", "foo");
    // expect to throw error
    expect(acture).to.throw(TypeError);
  });


  it("test key not exists", () => {
    const acture = get(Symbol(), ["bar"]);
    expect(acture).to.be.undefined;
    const acture2 = get({foo: "bar"}, ["bar"]);
    expect(acture2).to.be.undefined;
  });
});

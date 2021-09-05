import { expect } from "chai";

import callfunc, { defaultCall } from "../index.js";

describe("Test call func", () => {
  it("test call", () => {
    let check = false;
    const a = () => {
      check = true;
    };
    callfunc(a);
    expect(check).to.be.true;
  });

  it("test call with params", () => {
    let check = false;
    const a = (p) => {
      check = p;
    };
    const result = callfunc(a, ["foo"]);
    expect(check).to.equal("foo");
    expect(result).to.equal(undefined);
  });

  it("test call with scope", () => {
    let check = false;
    class uObj {
      a(p, hasThis) {
        check = p;
        if (hasThis) {
          expect(this).to.deep.equal({});
        } else {
          expect(this).to.be.undefined;
        }
      }
    }
    const o = new uObj();
    callfunc(o.a, ["foo", true], {});
    callfunc(o.a, ["foo", false]);
  });

  it("test with return", () => {
    const func = (...p) => p;
    expect(callfunc(func, ["foo", "bar"])).to.deep.equal(["foo", "bar"]);
  });

  it("test return with non-func", () => {
    expect(callfunc(undefined)).to.be.undefined;
  });
});

describe("Test default call func", () => {
  const def = () => {
    return "foo";
  };
  it("test default call", () => {
    const call1 = defaultCall(def);
    const call2 = defaultCall(def, () => "bar");
    const call3 = defaultCall(def, (p) => p);

    const foo = call1();
    const bar = call2();
    const foobar = call3("foo-bar");

    expect(foo).to.equal("foo");
    expect(bar).to.equal("bar");
    expect(foobar).to.equal("foo-bar");
  });
});

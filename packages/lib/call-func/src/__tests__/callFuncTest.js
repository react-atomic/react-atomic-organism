import { expect } from "chai";

import callfunc from "../callfunc";

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

  it("test return null", () => {
    const actual1 = callfunc("foo");
    expect(actual1).to.equal("foo");
    const actual2 = callfunc("foo", null, null, null);
    expect(actual2).to.be.null;
  });

  it("test return with non-func", () => {
    expect(callfunc(undefined)).to.be.undefined;
  });
});

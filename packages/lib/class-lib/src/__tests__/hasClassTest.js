import { expect } from "chai";

import hasClass from "../hasClass";

describe("Test hasClass", () => {
  it("has test", ()=>{
    expect(hasClass("aaa bbb ccc", "aaa")).to.be.true;
  });
  it("not has test", ()=>{
    expect(hasClass("aaa bbb ccc", "b")).to.be.false;
  });
});

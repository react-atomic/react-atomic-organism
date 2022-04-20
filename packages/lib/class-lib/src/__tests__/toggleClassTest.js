import { expect } from "chai";

import toggleClass from "../toggleClass";

describe("Test toggleClass", () => {
  it("toggle add", ()=>{
    expect(toggleClass("aaa", "bbb")).to.equal("aaa bbb");
  });
  it("not has test", ()=>{
    expect(toggleClass("aaa bbb", "bbb")).to.equal("aaa");
  });
});

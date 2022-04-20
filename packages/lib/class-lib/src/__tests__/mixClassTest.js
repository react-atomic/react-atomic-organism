import { expect } from "chai";

import mixClass from "../mixClass";

describe("Test mixClass", () => {
  it("mixClass basic test", ()=>{
    const acture = mixClass(1, "foo");
    expect(acture).to.equal("1 foo");
  });
  it("pass empty", ()=>{
    expect(mixClass()).to.equal("");
    const acture = mixClass(0,"",false,null,undefined);
    expect(acture).to.equal("");
  });
  it("pass duplicate", ()=>{
    const acture = mixClass(1, 1, 2, 2, 3, 3);
    expect(acture).to.equal("1 2 3");
  });
  it("pass array", ()=>{
    const acture = mixClass(['a', 'b'], ['c', 'd']);
    expect(acture).to.equal("a b c d");
  });
  it("pass object", ()=>{
    const acture = mixClass({a: true, b: false, c: true});
    expect(acture).to.equal("a c");
  });
});

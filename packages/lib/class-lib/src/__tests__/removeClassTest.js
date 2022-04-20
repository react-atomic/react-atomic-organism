import { expect } from "chai";

import removeClass from "../removeClass";

describe("Test removeClass", () => {
  it("remove test", ()=>{
    expect(removeClass("aaa bbb ccc", "aaa")).to.equal("bbb ccc");
  });
});

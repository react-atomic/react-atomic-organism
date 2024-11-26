// @ts-check
import { expect } from "chai";

import handleAnchor from "../index";

describe("Test handleAndStripAnchor", () => {
  it("basic test", ()=>{
    const path = handleAnchor("/foo#bar")(1);
    expect(path).to.equal("/foo");
  });
});

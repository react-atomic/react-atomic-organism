import { expect } from "chai";

import getStyle from "../index";

describe("Test getStyle", () => {
  it("basic test", () => {
    document.body.innerHTML = "<div style='padding:1px 2px 3px;'></div>";
    const d = document.querySelector("div");
    expect(getStyle(d, "padding")).to.equal("1px 2px 3px");
    expect(getStyle(d, "padding-top")).to.equal("1px");
    expect(getStyle(d, "padding-right")).to.equal("2px");
    expect(getStyle(d, "padding-bottom")).to.equal("3px");
    expect(getStyle(d, "padding-left")).to.equal("2px");;
  });
});

import { expect } from "chai";

import { htmlEncode, htmlDecode } from "../index";

describe("Test Html Encode", () => {
  it("basic test", () => {
    const acture = htmlEncode("&");
    expect(acture).to.equal("&amp;");
  });
});

describe("Test Html Encode", () => {
  it("basic test", () => {
    const acture = htmlDecode("&amp;");
    expect(acture).to.equal("&");
  });
});

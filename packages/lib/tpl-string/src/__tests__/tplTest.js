import { expect } from "chai";

import tpl from "../tpl";

describe("Tpl Test", () => {
  it("basic test", () => {
    const s = "hello {{world}} {{world}} {{mark}}";
    const actual = tpl(s, { world: "there", mark: "!" });
    expect(actual).to.equal("hello there there !");
  });
});

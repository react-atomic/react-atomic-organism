//@ts-check

import { expect } from "chai";
import { wildcardToRegExp, safeMatch } from "../index";

describe("test WildcardToRegExp", () => {
  it("test config mode", () => {
    const { reg } = wildcardToRegExp("(css|js|ts)", { escape: "config" });
    expect(safeMatch("css", reg)).to.include.members(["css"]);
    expect(safeMatch("js", reg)).to.include.members(["js"]);
    expect(safeMatch("ts", reg)).to.include.members(["ts"]);
    expect(safeMatch("cjs", reg)).to.be.null;
  });
});

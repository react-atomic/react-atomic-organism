import { expect } from "chai";

import tpl from "../tpl";

describe("Tpl Test", () => {
  it("basic test", () => {
    const s = "hello {{world}} {{world}} {{mark}}";
    const actual = tpl(s, { world: "there", mark: "!" });
    expect(actual).to.equal("hello there there !");
  });

  it("should handle multiple calls with same template (RegExp global flag state)", () => {
    // This test ensures the RegExp works correctly when reused across calls.
    // While String.replace() resets lastIndex, this test prevents regression
    // if implementation changes to use .test() or .exec() methods.
    const template = "greeting {{name}}";
    const result1 = tpl(template, { name: "Alice" });
    const result2 = tpl(template, { name: "Bob" });
    const result3 = tpl(template, { name: "Charlie" });

    expect(result1).to.equal("greeting Alice");
    expect(result2).to.equal("greeting Bob");
    expect(result3).to.equal("greeting Charlie");
  });

  it("keep string if not found", () => {
    const s = "hello {{ world }} {{mark}}";
    const actual = tpl(s, { world: "there" });
    expect(actual).to.equal("hello there {{mark}}");
  });
});

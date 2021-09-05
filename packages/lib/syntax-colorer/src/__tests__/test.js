import { expect } from "chai";
import syntaxColorer from "../index";

describe("Test syntaxColorer", () => {
  it("basicTest", () => {
    const code = "var foo = 'bar';";
    const result = syntaxColorer(code, "javascript");
    expect(result).to.have.string("span");
  });
});

import { expect } from "chai";
import getImportDefault from "../getImportDefault";

describe("Test getImportDefault", () => {
  it("default @ level 2", () => {
    const o = { default: { default: "l2" } };
    expect(getImportDefault(o)).to.equal("l2");
  });
  it("default @ level 1", () => {
    const o = { default: "l1" };
    expect(getImportDefault(o)).to.equal("l1");
  });
  it("test return obj", () => {
    const o = "o";
    expect(getImportDefault(o)).to.equal("o");
  });
});

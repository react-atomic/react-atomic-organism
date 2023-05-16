import { expect } from "chai";
import getDefaultValue from "../getDefaultValue";

describe("Test getDefaultValueTest", () => {
  it("test with function", () => {
    const acture = getDefaultValue((v) => v, "foo");
    expect(acture).to.equal("foo");
  });
  it("test with non funciton", () => {
    const acture = getDefaultValue("foo");
    expect(acture).to.equal("foo");
  });
});

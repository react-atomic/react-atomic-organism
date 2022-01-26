import { expect } from "chai";

import { oneItemArrayToString } from "../index.js";

describe("Test oneItemArrayToString", () => {
  it("basic test", () => {
    const a = ["foo"];
    expect(oneItemArrayToString(a)).to.equal("foo");
  });

  it("test keep string", () => {
    const a = "bar";
    expect(oneItemArrayToString(a)).to.equal("bar");
  });
});

import { expect } from "chai";

import prefixClass from "../prefixClass";

describe("Test prefixClass", () => {
  it("basic test", () => {
    const acture = prefixClass("md:", "p-1 m-1");
    expect(acture).to.equal("md:p-1 md:m-1");
  });
});

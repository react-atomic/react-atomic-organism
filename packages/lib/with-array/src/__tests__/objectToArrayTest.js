import { expect } from "chai";

import { objectToArray } from "../index";

describe("Test objectToArray", () => {
  it("test objectToArray", () => {
    const o = { foo1: "bar1", foo2: "bar2" };
    expect(objectToArray(o)).to.deep.equal(["bar1", "bar2"]);
  });
});

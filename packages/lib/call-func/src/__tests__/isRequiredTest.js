import { expect } from "chai";

import isRequired from "../isRequired";

describe("Test isRequired", () => {
  it("basic test", () => {
    const a = (foo = isRequired("foo")) => {};
    expect(a).to.throw("foo");
    const b = () => a("");
    expect(b).to.not.throw();
  });
});

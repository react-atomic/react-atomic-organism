import { expect } from "chai";

import defaultCall from "../defaultCall";

describe("Test default call func", () => {
  const def = () => {
    return "foo";
  };
  it("test default call", () => {
    const call1 = defaultCall(def);
    const call2 = defaultCall(def, () => "bar");
    const call3 = defaultCall(def, (p) => p);

    const foo = call1();
    const bar = call2();
    const foobar = call3("foo-bar");

    expect(foo).to.equal("foo");
    expect(bar).to.equal("bar");
    expect(foobar).to.equal("foo-bar");
  });
});

import { expect } from "chai";

import nest from "../nest";

describe("Test nest", () => {
  it("basic test", () => {
    const a = {
      "a.b.c": "foo",
    };
    const result = nest(a);
    expect(result["a"]["b"]["c"]).to.equal("foo");
  });
});

import { expect } from "chai";
import { jsdom as gjsdom } from "reshow-unit-dom";

import set from "../index";

describe("test set url", () => {
  let reset;

  afterEach(() => {
    reset();
  });

  it("basic test", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def" });
    expect(set("abc", "foo")).to.equal("http://xxx/?&abc=foo");
  });

  it("test set multi", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def" });
    expect(set("abc", ["foo", "bar"])).to.equal("http://xxx/?&abc=foo&abc=bar");
  });
});

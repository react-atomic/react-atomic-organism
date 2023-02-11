import { expect } from "chai";
import { jsdom as gjsdom } from "reshow-unit-dom";

import { unsetUrl } from "../index";

describe("test clean url", () => {
  let reset;

  afterEach(() => {
    reset();
  });

  it("remove first", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def&foo=bar" });
    expect(unsetUrl("abc")).to.equal("http://xxx/?&foo=bar");
  });

  it("remove last", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def&foo=bar" });
    expect(unsetUrl("foo")).to.equal("http://xxx/?abc=def");
  });

  it("key not exists", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def&foo=bar" });
    expect(unsetUrl("bar")).to.equal("http://xxx/?abc=def&foo=bar");
  });

  it("unset multi", () => {
    reset = gjsdom(null, { url: "http://xxx?abc=def&foo=bar1&foo=bar2&xxx" });
    expect(unsetUrl("foo")).to.equal("http://xxx/?abc=def&xxx");
  });
});

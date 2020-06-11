import { expect } from "chai";

import { getUrl } from "../index.js";

global.document = {};
describe("test get url", () => {
  let document;
  beforeEach(() => {
    document = global.document;
  });

  it("basic test", () => {
    document.URL = "http://xxx?abc=def";
    expect(getUrl("abc")).to.equal("def");
  });

  it("test get empty string with &", () => {
    document.URL = "http://xxx?foo=&";
    expect(getUrl("foo")).to.equal("");
  });

  it("test get empty string without &", () => {
    document.URL = "http://xxx?foo=";
    expect(getUrl("foo")).to.equal("");
  });

  it("test get null", () => {
    document.URL = "http://xxx?foo";
    expect(getUrl("foo")).to.be.null;
    expect(getUrl("bar")).to.be.null;
  });
});

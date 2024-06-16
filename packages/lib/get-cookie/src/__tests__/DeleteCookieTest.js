import { expect } from "chai";

import getCookie, { setCookie, deleteCookie } from "../index";

describe("test delete cookie", () => {
  it("simple test", () => {
    setCookie("foo", "bar");
    expect(getCookie("foo")).to.equal("bar");
    deleteCookie("foo");
    expect(getCookie("foo")).to.be.null;
  });
});

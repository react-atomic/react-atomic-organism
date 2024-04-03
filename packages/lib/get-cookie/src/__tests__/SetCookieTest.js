import { expect } from "chai";
import sinon from "sinon";

import getCookie, { setCookie } from "../index";
import { getCookieSetStr } from "../getCookieSetStr";

describe("test set cookie", () => {
  it("simple test", () => {
    setCookie("foo", "bar");
    expect(getCookie("foo")).to.equal("bar");
  });

  it("test with domain", () => {
    const now = new Date();
    const clock = sinon.useFakeTimers(now.getTime());
    const s = getCookieSetStr("foo", "bar", 1, "localhost");
    clock.restore();
    now.setTime(now.getTime() + 1);
    const expected = `foo=bar;expires=${now.toUTCString()};domain=localhost;path=/`;
    expect(s).to.equal(expected);
  });

  it("test without domain", () => {
    const now = new Date();
    const clock = sinon.useFakeTimers(now.getTime());
    const s = getCookieSetStr("foo", "bar", 1);
    clock.restore();
    now.setTime(now.getTime() + 1);
    const expected = `foo=bar;expires=${now.toUTCString()};path=/`;
    expect(s).to.equal(expected);
  });

  it("test without expires", () => {
    const s = getCookieSetStr("foo", "bar", null, "localhost");
    const expected = `foo=bar;domain=localhost;path=/`;
    expect(s).to.equal(expected);
  });

  it("test key and value only", () => {
    const s = getCookieSetStr("foo", "bar");
    const expected = `foo=bar;path=/`;
    expect(s).to.equal(expected);
  });
});

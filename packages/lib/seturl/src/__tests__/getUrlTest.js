import { expect } from "chai";
import gjsdom from 'jsdom-global';

import { getUrl } from "../index.js";

describe("test get url", () => {
  let reset;
  afterEach(() => {
    reset();
  });

  it("basic test", () => {
    reset = gjsdom(null, {url: "http://xxx?abc=def"});
    expect(getUrl("abc")).to.equal("def");
  });

  it("test get empty string with &", () => {
    reset = gjsdom(null, {url: "http://xxx?foo=&"});
    expect(getUrl("foo")).to.equal("");
  });

  it("test get empty string without &", () => {
    reset = gjsdom(null, {url: "http://xxx?foo="});
    expect(getUrl("foo")).to.equal("");
  });

  it("test get null", () => {
    reset = gjsdom(null, {url: "http://xxx?foo"});
    expect(getUrl("foo")).to.be.undefined;
    expect(getUrl("bar")).to.be.undefined;
  });

  it("test get mulit", () => {
    reset = gjsdom(null, {url: "http://xxx?foo=1&foo=2"});
    const actual = getUrl('foo');
    expect(actual).to.deep.equal(['1', '2']);
  });
});

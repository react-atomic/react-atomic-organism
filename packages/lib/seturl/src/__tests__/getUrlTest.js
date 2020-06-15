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

  it("test get without query", () => {
    reset = gjsdom(null, {url: "http://xxx"});
    expect(getUrl("foo")).to.be.undefined;
    expect(getUrl("bar")).to.be.undefined;
  });

  it("test get multi", () => {
    reset = gjsdom(null, {url: "http://xxx?foo=1&foo=2"});
    const actual = getUrl('foo');
    expect(actual).to.deep.equal(['1', '2']);
  });

  it("test get multi with similar key", () => {
    reset = gjsdom(null, {url: "http://xxx?type=1&email_type=2"});
    const actual = getUrl('type');
    expect(actual).to.equal('1');
  });

  it("test get multi with similar key and zero match", () => {
    reset = gjsdom(null, {url: "http://xxx?xxx_type=1&email_type=2"});
    const actual = getUrl('type');
    expect(actual).to.be.undefined;
  });
});

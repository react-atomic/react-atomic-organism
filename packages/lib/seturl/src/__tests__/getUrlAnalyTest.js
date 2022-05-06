import { expect } from "chai";

import { parseUrl } from "../index";
import getUrlAnaly from "../getUrlAnaly";

describe("test url analy", () => {
  it("basic test", () => {
    const test = "http://user:password@www.host.com:80/path?foo-query=bar#hash";
    const acture = getUrlAnaly(test);
    expect(acture).to.deep.equal([
      "http://user:password@www.host.com:80/path?foo-query=bar#hash", //0
      "http://user:password@www.host.com:80/path?foo-query=bar", //1
      "http://user:password@www.host.com:80/path", //2
      "http://user:password@www.host.com:80", //3
      "http:", //4
      "//", //5
      "user:password@www.host.com:80", //6
      "user:password", //7
      "user", //8
      "password", //9
      "www.host.com:80", //10
      "www.host.com", //11
      "80", //12
      "/path", //13
      "/", //14
      "path", //15
      "?foo-query=bar", //16
      "#hash", //17
    ]);
  });

  it("test get QueryString", () => {
    const test = "http://xxx/yyy*?abc=aaa";
    const { query } = parseUrl(test);
    expect(query).to.equal("?abc=aaa");
  });

  it("test get HostName", () => {
    const test = "http://user:password@www.host.com:80/yyy*?abc=aaa";
    const { host } = parseUrl(test);
    expect(host).to.equal("www.host.com");
  });

  it("test get path", () => {
    const test = "http://xxx/yyy*?abc=aaa";
    const { path } = parseUrl(test);
    expect(path).to.equal("/yyy*");
  });
});

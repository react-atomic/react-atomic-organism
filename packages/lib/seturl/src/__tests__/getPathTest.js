import { getPath } from "../index.js";
import { expect } from "chai";

describe("test get path", () => {
  it("basic test", () => {
    const test = "http://xxx/yyy?foo=bar";
    const acture = getPath(test);
    expect(acture).to.equal("http://xxx/yyy");
  });

  it("test question", () => {
    const test = "http://xxx/yyy*?abc=aaa";
    const acture = getPath(test, null, true);
  });
});

import { expect } from "chai";
import getSafeReg, { cacheReg } from "../index.js";

describe("test cache reg", () => {
  const getRegString = name => "(([#?&])" + getSafeReg(name) + "=)([^&#]*)";

  it("get cache back", () => {
    const cache = {};
    const getCache = name => cacheReg(cache)(getRegString)(name);
    const reg = getCache("foo");
    const exec = reg.exec("?foo=bar");
    expect(exec[3]).to.equal("bar");
    expect(cache["foo"]).to.not.be.null;
  });

  it("tet flags", () => {
    const cache = {};
    const getCache = name => cacheReg(cache)(getRegString, "g")(name);
    const reg = getCache("foo");
    let exec;
    const arr = [];
    const str = "?foo=&foo=1&foo=2";
    while ((exec = reg.exec(str))) {
      arr.push(exec[3]);
    }
    expect(arr).to.deep.equal(["", "1", "2"]);
  });
});

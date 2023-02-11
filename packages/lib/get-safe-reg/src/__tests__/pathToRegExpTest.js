import { expect } from "chai";
import { searchRegPath } from "../index";

describe("test searchRegPath", () => {
  it("basic test", () => {
    const actual = searchRegPath("/user/aaa/bbb", "/user/:foo/:bar");
    expect(actual).to.deep.equals({ foo: "aaa", bar: "bbb" });
  });

  it("test dash", () => {
    const actual = searchRegPath("w-1", ":key-:val");
    expect(actual).to.deep.equals({ key: "w", val: "1" });
  });

  it("test []", () => {
    const actual = searchRegPath("w-[32rem]", ":key-[:val]");
    expect(actual).to.deep.equals({ key: "w", val: "32rem" });
  });

  it("test ?", () => {
    const actual1 = searchRegPath("/a/a", "/??/:id");
    expect(actual1).to.be.false;
    const actual2 = searchRegPath("/aa/b", "/??/:id");
    expect(actual2).to.deep.equals({ id: "b" });
    const actual3 = searchRegPath("/aa/bb/cc", "/??/:id/??");
    expect(actual3).to.deep.equals({ id: "bb" });
    const actual4 = searchRegPath("/aaa/111", "/??/:id");
    expect(actual4).to.deep.equals({ id: "111" });
  });

  it("test *", () => {
    const actual = searchRegPath("/111/222/333", "/*/:id/*");
    expect(actual).to.deep.equals({ undefined: ["111", "333"], id: "222" });
  });

  it("test * with ?", () => {
    const actual = searchRegPath("/abcd", "/*??");
    expect(actual).to.deep.equals({ undefined: "ab" });
  });
});

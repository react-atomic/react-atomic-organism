import { expect } from "chai";
import { wildcardSearch } from "../index";

describe("test searchRegPath", () => {
  it("basic test", () => {
    const actual = wildcardSearch("/user/aaa/bbb", "/user/:foo/:bar");
    expect(actual).to.deep.equals({ foo: "aaa", bar: "bbb" });
  });

  it("test dash", () => {
    const actual = wildcardSearch("w-1", ":key-:val");
    expect(actual).to.deep.equals({ key: "w", val: "1" });
  });

  it("test ?", () => {
    const actual1 = wildcardSearch("/a/a", "/??/:id");
    expect(actual1).to.be.false;
    const actual2 = wildcardSearch("/aa/b", "/??/:id");
    expect(actual2).to.deep.equals({ id: "b" });
    const actual3 = wildcardSearch("/aa/bb/cc", "/??/:id/??");
    expect(actual3).to.deep.equals({ id: "bb" });
    const actual4 = wildcardSearch("/aaa/111", "/??/:id");
    expect(actual4).to.deep.equals({ id: "111" });
  });

  it("test *", () => {
    const actual = wildcardSearch("/111/222/333", "/*/:id/*");
    expect(actual).to.deep.equals({ undefined: ["111", "333"], id: "222" });
  });

  it("test * with ?", () => {
    const actual = wildcardSearch("/abcd", "/*??");
    expect(actual).to.deep.equals({ undefined: "ab" });
  });

  it("test []", () => {
    const actual1 = wildcardSearch("w-[32rem]", ":key-\\[:val\\]");
    expect(actual1).to.deep.equals({ key: "w", val: "32rem" });
    const actual2 = wildcardSearch("w-[32rem]", ":key-[:val]", {
      escape: "brackets",
    });
    expect(actual2).to.deep.equals({ key: "w", val: "32rem" });
  });

  it("test number []", () => {
    const actual = wildcardSearch("/ddd/cccc/a.13/", "/*/a.[0-1]3");
    expect(actual).to.deep.equals({ undefined: "ddd/cccc" });
  });

  it("test pointer .", () => {
    const notMatch = wildcardSearch("/aaa/../1/", "/aaa/./[1]/");
    expect(notMatch).to.be.false;
    const shouldMatch = wildcardSearch("/aaa/../1/", "/aaa/../[1]/");
    expect(shouldMatch).to.be.true;
    const withBracketsEscNotMatch = wildcardSearch(
      "/aaa/../[1]/",
      "/aaa/./[:id]/",
      { escape: "brackets" }
    );
    expect(withBracketsEscNotMatch).to.be.false;
    const withBracketsEscShouldMatch = wildcardSearch(
      "/aaa/../[1]/",
      "/aaa/../[:id]/",
      { escape: "brackets" }
    );
    expect(withBracketsEscShouldMatch).to.deep.equals({ id: "1" });
  });
});

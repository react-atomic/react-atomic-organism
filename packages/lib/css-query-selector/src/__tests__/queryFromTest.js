import { expect } from "chai";
import queryFrom from "../queryFrom";

describe("Test", () => {
  after(() => (document.body.innerHTML = ""));

  it("sample test", () => {
    const query = queryFrom(() => document);
    const name = query.one("body").nodeName;
    expect(name).to.be.equal("BODY");
  });

  it("test base is not func", () => {
    const query = queryFrom(document);
    const name = query.one("body").nodeName;
    expect(name).to.be.equal("BODY");
  });

  it("test base is undefined", () => {
    const query = queryFrom(undefined);
    expect(query).to.be.false;
  });

});

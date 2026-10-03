import { expect } from "chai";
import { isWildcard } from "../index";

describe("test isWildcard", () => {
  it("detects *", () => {
    expect(isWildcard("*review")).to.be.true;
    expect(isWildcard("git-*")).to.be.true;
  });

  it("detects ?", () => {
    expect(isWildcard("g?t")).to.be.true;
  });

  it("returns false for plain strings", () => {
    expect(isWildcard("git-mapper")).to.be.false;
    expect(isWildcard("a.b+c(d)")).to.be.false;
  });

  it("handles empty and non-string input", () => {
    expect(isWildcard("")).to.be.false;
    expect(isWildcard(undefined)).to.be.false;
    expect(isWildcard(null)).to.be.false;
    expect(isWildcard(123)).to.be.false;
  });
});

import { expect } from "chai";
import { win, doc, hasWin } from "../index";

describe("Test doc", () => {
  it("test doc", () => {
    const d = doc();
    expect(d).to.equal(document);
  });
});

describe("Test win", () => {
  it("test win", () => {
    const w = win();
    expect(w).to.equal(window);
  });

  it("test has win", () => {
    expect(hasWin()).to.be.true;
  });
});

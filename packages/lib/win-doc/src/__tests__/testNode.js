import { expect } from "chai";
import { jsdom, cleanIt } from "reshow-unit-dom";
import { win, doc, hasWin } from "../index";

describe("Test doc in node", () => {
  before(() => {
    jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanIt());

  it("test doc", () => {
    const d = doc();
    expect(d.__null).to.be.true;
  });
});

describe("Test win in node", () => {
  before(() => {
    jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanIt());

  it("test win", () => {
    const w = win();
    expect(w.__null).to.be.true;
  });

  it("test has win", () => {
    const w = win();
    expect(hasWin()).to.be.false;
  });
});

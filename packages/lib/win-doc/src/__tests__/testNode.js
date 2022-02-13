import { win, doc, hasWin } from "../index.js";
import { expect } from "chai";
import jsdom from "jsdom-global";

describe("Test doc in node", () => {
  let cleanup;

  before(() => {
    cleanup = jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanup());

  it("test doc", () => {
    const d = doc();
    expect(d.__null).to.be.true;
  });
});

describe("Test win in node", () => {
  let cleanup;

  before(() => {
    cleanup = jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanup());

  it("test win", () => {
    const w = win();
    expect(w.__null).to.be.true;
  });

  it("test has win", () => {
    const w = win();
    expect(hasWin()).to.be.false;
  });
});

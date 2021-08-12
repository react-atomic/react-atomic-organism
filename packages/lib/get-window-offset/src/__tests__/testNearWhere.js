import { expect } from "chai";

import { getNearLocation } from "../nearWhere";

describe("test getNearLocation", () => {
  it("test get top left", () => {
    const actual = getNearLocation({ x: 10, y: 10 }, { x: 9, y: 9 });
    expect(actual.top).to.be.true;
    expect(actual.left).to.be.true;
  });

  it("test get bottom right", () => {
    const actual = getNearLocation({ x: 10, y: 10 }, { x: 11, y: 11 });
    expect(actual.bottom).to.be.true;
    expect(actual.right).to.be.true;
  });

  it("test get top center", () => {
    const actual = getNearLocation({ x: 10, y: 10 }, { x: 10, y: 9 });
    expect(actual.top).to.be.true;
    expect(actual.center).to.be.true;
  });

  it("test get center center", () => {
    const actual = getNearLocation({ x: 10, y: 10 }, { x: 10, y: 10 });
    expect(actual.centerCenter).to.be.true;
    expect(actual.center).to.be.true;
  });
});

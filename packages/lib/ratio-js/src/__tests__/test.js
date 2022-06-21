import { expect } from "chai";

import ratio from "../index";

describe("Test to percent", () => {
  it("basic test", () => {
    expect(ratio(50, 60, 300, 600)).to.deep.equal({
      newWHLoc: { x: 0, y: 120 },
      maxWHLoc: { x: -100, y: 0 },
      origWHLoc: { x: 125, y: 270 },
      newWH: { w: 300, h: 360 },
      maxWH: { w: 500, h: 600 },
      origWH: { w: 50, h: 60 },
    });
  });
});

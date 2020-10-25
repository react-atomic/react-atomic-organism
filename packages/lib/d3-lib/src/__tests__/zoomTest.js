import { toZoomTransform } from "../index";

import { expect } from "chai";

describe("Test toZoomTransform", () => {
  it("basic test", () => {
    const xyk = { x: 1, y: 2, k: 3 };
    const a = toZoomTransform(xyk);
    const { x, y, k } = a;
    expect(xyk).to.deep.equal({ x, y, k });
  });
});

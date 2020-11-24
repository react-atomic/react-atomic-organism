import { expect } from "chai";
import getScrollInfo from "../index";

describe("Test", () => {
  it("sample test", () => {
    expect(getScrollInfo()).to.deep.equal({
      atTop: true,
      atRight: true,
      atBottom: true,
      atLeft: true,
      isScrollDown: undefined,
      isScrollLeft: undefined,
      isScrollRight: undefined,
      isScrollUp: undefined,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollNodeWidth: 1024,
      scrollNodeHeight: 768,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });
});

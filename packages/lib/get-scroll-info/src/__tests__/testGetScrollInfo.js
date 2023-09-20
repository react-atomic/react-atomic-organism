import { expect } from "chai";
import getScrollInfo from "../index";

describe("Test", () => {
  it("sample test", () => {
    const {scrollEl, ...rest} = getScrollInfo();
    expect(rest).to.deep.equal({
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
      right: 1024,
      bottom: 768,
      left: 0,
    });
  });
});

//@ts-check
/**
 * @typedef {import("mocha")}
 */

import { render, getSinon } from "reshow-unit";
import { expect } from "chai";

import useIntersectionObserver from "../useIntersectionObserver";

describe("test useIntersectionObserver", () => {
  before(() => {
    class IntersectionObserver {
      observe() {}
      unobserve() {}
    }
    window.IntersectionObserver = getSinon().spy(IntersectionObserver);
  });
  it("basic test", () => {
    const Comp = () => {
      return useIntersectionObserver("div", ()=>{});
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
  });
});

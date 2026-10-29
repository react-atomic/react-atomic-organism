import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import CarouselSwipe from "../CarouselSwipe";

describe("test carousel", () => {
  it("basic test", () => {
    const wrap = render(<CarouselSwipe />);
    expect(wrap.html()).to.have.string("carousel-swipe");
  });
});

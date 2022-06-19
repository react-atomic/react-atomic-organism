import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import CarouselSwipe from "../CarouselSwipe";

describe("test carousel", () => {
  it("basic test", () => {
    const wrap = mount(<CarouselSwipe />);
    expect(wrap.html()).to.have.string("carousel-swipe");
  });
});

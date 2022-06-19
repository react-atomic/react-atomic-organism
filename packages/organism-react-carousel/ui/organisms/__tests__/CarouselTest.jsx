import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import Carousel from "../Carousel";

describe("test carousel", () => {
  it("basic test", () => {
    const wrap = mount(<Carousel />);
    expect(wrap.html()).to.have.string("carousel");
  });
});

import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import Carousel from "../Carousel";

describe("test carousel", () => {
  it("basic test", () => {
    const wrap = render(<Carousel />);
    expect(wrap.html()).to.have.string("carousel");
  });
});

import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import ParallaxBackground from "../ParallaxBackground";

describe("ParallaxBackground test", () => {

  it("basic test", () => {
    const vDom = <ParallaxBackground attachDestRetry={0} />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string("parallax");
  });

});

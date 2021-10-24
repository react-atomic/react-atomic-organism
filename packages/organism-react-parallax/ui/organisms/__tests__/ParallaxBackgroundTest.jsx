import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import ParallaxBackground from "../ParallaxBackground";

describe("ParallaxBackground test", () => {
  it("basic test", ()=>{
    const vDom = (
      <ParallaxBackground />
    );
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("parallax");
  });  
});

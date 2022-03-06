import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import Spotlight from "../Spotlight";

describe("Spotlight Test", () => {
  it("basic test", () => {
    const vDom = <Spotlight />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.be.null;
  });
});

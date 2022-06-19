import React from "react";
import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

import GeometryAngle from "../GeometryAngle";

describe("GeometryAngle Test", () => {
  after(() => cleanIt());

  it("basic test", () => {
    const vDom = <GeometryAngle />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

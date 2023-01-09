import React from "react";
import { expect } from "chai";
import { render, hideConsoleError } from "reshow-unit";

import GeometryAngle from "../GeometryAngle";

describe("GeometryAngle Test", () => {
  before(()=>hideConsoleError());
  it("basic test", () => {
    const vDom = <GeometryAngle />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

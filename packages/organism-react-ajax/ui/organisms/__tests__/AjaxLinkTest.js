import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import AjaxLink from "../AjaxLink";

describe("AjaxLink Test", () => {
  it("basic test", () => {
    const vDom = <AjaxLink />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("</a>");
  });
});

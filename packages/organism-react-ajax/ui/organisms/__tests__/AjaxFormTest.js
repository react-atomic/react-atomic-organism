import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import AjaxForm from "../AjaxForm";

describe("AjaxForm Test", () => {
  it("basic test", () => {
    const vDom = <AjaxForm />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("form");
  });
});

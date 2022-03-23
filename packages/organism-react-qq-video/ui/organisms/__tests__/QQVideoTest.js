import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import QQVideo from "../QQVideo";
describe("QQVideo Test", () => {
  it("basic test", () => {
    const vDom = <QQVideo />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("video");
  });
});

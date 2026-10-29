import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import QQVideo from "../QQVideo";
describe("QQVideo Test", () => {
  it("basic test", () => {
    const vDom = <QQVideo />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string("video");
  });
});

import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import VideoFile from "../VideoFile";
describe("VideoFile Test", () => {
  it("basic test", () => {
    const vDom = <VideoFile />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("video");
  });
});

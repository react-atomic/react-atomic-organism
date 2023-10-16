import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import VideoFile from "../VideoFile";
describe("VideoFile Test", () => {
  it("basic test", () => {
    const vDom = <VideoFile />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string("video");
  });
});

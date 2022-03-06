import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import EventTimeline from "../EventTimeline";

describe("EventTimeline Test", () => {
  it("basic test", () => {
    const vDom = <EventTimeline />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

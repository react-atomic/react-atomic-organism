import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import EventTimeline from "../EventTimeline";

describe("EventTimeline Test", () => {
  it("basic test", () => {
    const wrap = render(<EventTimeline />);
    expect(wrap.html()).to.have.string("div");
  });
});

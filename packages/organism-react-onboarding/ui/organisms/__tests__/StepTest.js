import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import Step from "../Step";

describe("Step Test", () => {
  it("basic test", () => {
    const wrap = render(<Step />);
    expect(wrap.html()).to.equal("");
  });
});

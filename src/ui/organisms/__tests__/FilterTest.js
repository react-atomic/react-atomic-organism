import { useState } from "react";

import { expect } from "chai";
import { render, act } from "reshow-unit";

import { Filter } from "../Filter";

describe("Test Filter Component", () => {
  it("basic test", () => {
    const Comp = () => <div />;
    const comp = <Filter component={Comp} />;
    const wrapper = render(comp);
    const html = wrapper.html();
    expect(html).to.have.string("div");
  });
});

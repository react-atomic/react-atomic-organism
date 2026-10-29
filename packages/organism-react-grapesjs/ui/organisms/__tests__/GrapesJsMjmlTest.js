import React from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import GrapesJsMjml from "../GrapesJsMjml";

describe("Test GrapesJsMjml Component", () => {
  it("simple test", async () => {
    const fakeHost = {
      execUpdateImages: () => {},
    };
    const wrapper = render(<GrapesJsMjml host={fakeHost} />);
    expect(wrapper.html()).to.have.string("iframe");
    await wrapper.unmount();
  });
});

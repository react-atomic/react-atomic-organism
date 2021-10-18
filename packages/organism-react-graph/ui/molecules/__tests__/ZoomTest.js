import React from "react";

import { expect } from "chai";
import { shallow, mount } from "reshow-unit";

import Zoom from "../Zoom";

describe("Test Zoom", () => {
  it("base test", () => {
    const vDom = (<svg><Zoom /></svg>);
    const wrap = mount(vDom);
    expect(wrap.html()).to.have.string("zoom");
  });
});

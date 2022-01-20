import React from "react";

import { expect } from "chai";
import { jsdom, mount } from "reshow-unit";

import Zoom from "../Zoom";

describe("Test Zoom", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });
  it("base test", (done) => {
    const vDom = (
      <svg>
        <Zoom />
      </svg>
    );
    const wrap = mount(vDom);
    setTimeout(() => {
      expect(wrap.html()).to.have.string("zoom");
      done();
    }, 500);
  });
});

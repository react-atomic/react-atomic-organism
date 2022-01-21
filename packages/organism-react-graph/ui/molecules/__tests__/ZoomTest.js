import React from "react";

import { expect } from "chai";
import { jsdom, mount } from "reshow-unit";

import Zoom from "../Zoom";

describe("Test Zoom", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });
  it("base test", (done) => {
    const onD3Load = ()=>{
      expect(wrap.html()).to.have.string("zoom");
      done();
    };
    const vDom = (
      <svg>
        <Zoom onD3Load={onD3Load}/>
      </svg>
    );
    const wrap = mount(vDom);
  });
});

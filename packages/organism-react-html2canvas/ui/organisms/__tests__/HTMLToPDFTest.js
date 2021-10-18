import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import HTMLToPDF from "../HTMLToPDF";

describe("Test html2pdf", () => {
  it("basic test", ()=>{
    const vDom = <HTMLToPDF />;
    const wrap = mount(vDom);
    expect(wrap.html()).to.have.string("iframe");
  });
});

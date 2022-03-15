import React from 'react';
import { expect } from "chai";
import { mount } from "reshow-unit";

import IframeContainer from "../IframeContainer";
describe("Test IframeContainer", () => {
  it("basic test", ()=>{
    const wrap = mount(<IframeContainer />);
    expect(wrap.html()).to.have.string(`loading="lazy"`);
  });
  it("unset loading", ()=>{
    const wrap = mount(<IframeContainer loading={null} />);
    expect(wrap.html()).not.have.string(`loading="lazy"`);
  });
});

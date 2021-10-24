import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";
import sinon from "sinon";
const sandbox = sinon.createSandbox();

import Animate from "../Animate";
import AnimateGroup from "../AnimateGroup";

describe("Animate", () => {
  it("constructor", () => {
    let vDom = (
      <Animate>
        <div>abc</div>
      </Animate>
    );
    const html = mount(vDom);
    const actual = html.html();
    html.update();
    html.setProps({ children: [<p>def</p>, <div>abc</div>] });
    html.update();
  });
});

describe("AnimateGroup", () => {
  const comp = {AnimateGroup};

  before(() => {
    sandbox.spy(comp);
  });
  after(() => {
    sandbox.restore();
  });
  it("Test handleExit", () => {
    let vDom = (
      <comp.AnimateGroup timeout={1000}>
        <div>abc</div>
      </comp.AnimateGroup>
    );
    const html = mount(vDom);
    expect(comp.AnimateGroup.callCount).to.equal(1);
    html.setProps({ children: null });
    expect(comp.AnimateGroup.callCount).to.equal(2);
  });
});

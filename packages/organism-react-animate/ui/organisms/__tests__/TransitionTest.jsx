import React from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import sinon from "sinon";
const sandbox = sinon.createSandbox();

import Transition from "../Transition";
import { dataStatusKey } from "../../../src/const";
import { SemanticUI } from "react-atomic-molecule";

describe("Test Transition", () => {
  after(() => {
    sandbox.restore();
  });

  it("basic test", () => {
    return;
    const vDom = (
      <Transition>
        <div />
      </Transition>
    );
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string(`${dataStatusKey}="exited"`);
  });

  it("test in=true", () => {
    return;
    const vDom = (
      <Transition in>
        <div />
      </Transition>
    );
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string(`${dataStatusKey}="entering"`);
  });

  it("test entered", (done) => {
    let wrap;
    const end = () => {
      setTimeout(() => {
        wrap.update();
        expect(wrap.html()).to.have.string(`${dataStatusKey}="entered"`);
        done();
      });
    };
    const vDom = (
      <Transition in enter appear addEndListener={end}>
        <SemanticUI />
      </Transition>
    );
    wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string(`${dataStatusKey}="entering"`);
  });
});

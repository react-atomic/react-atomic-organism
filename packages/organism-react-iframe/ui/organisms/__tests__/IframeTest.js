import React from "react";
import gJsdom from "jsdom-global";
import { ResourceLoader } from "jsdom";

import { expect } from "chai";
import { mount } from "reshow-unit";

import Iframe from "../Iframe";
describe("Test Iframe", () => {
  let reset;
  beforeEach(() => {
    const resourceLoader = new ResourceLoader({});
    resourceLoader.fetch = (url, options) =>
      Promise.resolve(Buffer.from('window.dlog = "fake-dlog";'));
    reset = gJsdom("", {
      runScripts: "dangerously",
      resources: resourceLoader,
    });
  });

  afterEach(() => {
    reset();
  });

  it("simple test", (done) => {
    let compEl;
    const Comp = (props) => (
      <Iframe ref={(el) => (compEl = el)}>
        <span>test</span>
      </Iframe>
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    const wrap = mount(<Comp />, { attachTo: el });
    expect(wrap.html()).to.have.string(`loading="lazy"`);
    setTimeout(() => {
      const html = compEl.getBody().innerHTML;
      expect(html).to.have.string("<span>test</span>");
      done();
    }, 100);
  });

  it("test with script", (done) => {
    let compEl;
    const Comp = (props) => (
      <Iframe ref={(el) => (compEl = el)}>
        <script src="https://cdn.jsdelivr.net/npm/organism-react-ajax@0.6.13/build/dlog.min.js"></script>
      </Iframe>
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    const wrap = mount(<Comp />, { attachTo: el });
    setTimeout(() => {
      const dlog = compEl.getWindow().dlog;
      expect(dlog).to.equal("fake-dlog");
      done();
    }, 300);
  });

  it("unset loading", ()=>{
    const wrap = mount(<Iframe loading={null} />);
    expect(wrap.html()).to.not.have.string(`loading="lazy"`);
  });
});

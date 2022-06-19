import React, { Component } from "react";
import jsdom from "jsdom-global";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { openCodeEditor } from "../CodeEditor";
import { PopupPool, popupDispatch } from "organism-react-popup";

describe("Test CodeEditor", () => {
  let wrapper;
  let reset;
  after(() => {
    jsdom();
  });

  beforeEach(() => {
    reset = jsdom("", {
      resources: "usable",
    });
  });

  afterEach((done) => {
    popupDispatch("dom/cleanAll");
    wrapper.unmount();
    setTimeout(() => {
      reset();
      done();
    }, 300);
  });

  it("simple test", (done) => {
    const dom = <PopupPool />;
    wrapper = mount(dom);
    openCodeEditor();
    setTimeout(() => {
      wrapper.update();
      const html = wrapper.html();
      expect(html).to.have.string("full-screen");
      done();
    }, 100);
  });

  it("test set html", (done) => {
    const dom = <PopupPool />;
    wrapper = mount(dom);
    openCodeEditor("<div />", (html) => {
      expect(html).to.equal("");
      done();
    });
    wrapper.update();
    setTimeout(() => {
      wrapper.update();
      const iframe = wrapper.find("iframe.codemirror");
      popupDispatch("dom/closeAll");
    }, 1000);
  });
});

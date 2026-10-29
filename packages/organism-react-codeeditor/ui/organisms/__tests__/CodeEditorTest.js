import React from "react";

import { expect } from "chai";
import { jsdom, act, render, waitFor } from "reshow-unit";

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

  it("simple test", async () => {
    wrapper = render(<PopupPool />);
    openCodeEditor();
    await act();
    await waitFor(() => {
      expect(wrapper.html()).to.have.string("full-screen");
    });
  });

  it("test set html", (done) => {
    wrapper = render(<PopupPool />);
    openCodeEditor("<div />", (html) => {
      expect(html).to.equal("");
      done();
    });
    setTimeout(() => {
      const iframe = document.querySelector("iframe.codemirror");
      expect(iframe).to.not.equal(null);
      popupDispatch("dom/closeAll");
    }, 1000);
  });
});

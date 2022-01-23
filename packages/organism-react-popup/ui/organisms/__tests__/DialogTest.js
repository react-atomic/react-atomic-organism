import React, { Component } from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import Dialog from "../Dialog";

describe("Test Dialog", () => {
  it("simple test", (done) => {
    const vDom = <Dialog />;
    const oDom = mount(vDom);
    setTimeout(() => {
      oDom.update();
      const actual = oDom.html();
      expect(actual).to.have.string("div");
      done();
    }, 30);
  });
});

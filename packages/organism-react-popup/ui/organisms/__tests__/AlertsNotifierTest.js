import React, { Component } from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import AlertsNotifier from "../AlertsNotifier";

describe("Test AlertsNotifier", () => {
  it("simple test", (done) => {
    const vDom = <AlertsNotifier alerts={['1']} />;
    const oDom = mount(vDom);
    setTimeout(() => {
      oDom.update();
      const actual = oDom.html();
      expect(actual).to.have.string("div");
      done();
    }, 30);
  });
});

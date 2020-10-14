import React, { Component } from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

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
    }, 300);
  });
});

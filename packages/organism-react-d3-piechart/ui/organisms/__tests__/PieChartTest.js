import React from "react";

import { expect } from "chai";
import { jsdom, mount } from "reshow-unit";

import PieChart from "../PieChart";

describe("Test PieChart", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("basic test", (done) => {
    const wrap = mount(<PieChart />);
    setTimeout(() => {
      wrap.update();
      const html = wrap.html();
      expect(html).to.have.string("svg");
      done();
    }, 500);
  });
});

import React, { Component } from "react";

import { expect } from "chai";
import { jsdom, mount } from "reshow-unit";
import Line from "../Line";

describe("Test Line Component", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("base test", (done) => {
    let objLine;
    let wrap;
    const onD3Load = () => {
      setTimeout(() => {
        expect(objLine.getCenter()).to.deep.equal({ x: 5, y: 0 });
        const html = wrap.html();
        expect(html).to.equal(
          '<svg><path d="M0,0L0.8333333333333334,0C1.6666666666666667,0,3.3333333333333335,0,5,1.6666666666666667C6.666666666666667,3.3333333333333335,8.333333333333334,6.666666666666667,9.166666666666666,8.333333333333334L10,10"></path></svg>'
        );
        done();
      });
    };
    const comp = (
      <svg>
        <Line
          onD3Load={onD3Load}
          ref={(el) => (objLine = el)}
          start={{ x: 0, y: 0 }}
          end={{ x: 10, y: 10 }}
          curve
        />
      </svg>
    );
    wrap = mount(comp);
  });
});

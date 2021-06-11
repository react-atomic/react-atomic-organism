import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import ProgressBar from "../ProgressBar";

describe("Test ProgressBar", () => {
  it("basic test", (done) => {
    const VDom = (props) => (
      <div>
        <ProgressBar />
      </div>
    );
    const wrap = mount(<VDom />);
    setTimeout(() => {
      const actual = wrap.html();
      console.log({ actual });
      expect(actual).to.have.string("progress ui");
      done();
    }, 100);
  });
});

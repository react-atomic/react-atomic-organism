import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import { PopupPool } from "organism-react-popup";
import PageLoadProgressHandler from "../PageLoadProgressHandler";

describe("Test PageLoadProgressHandler", () => {
  it("basic test", (done) => {
    const VDom = (props) => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(<PageLoadProgressHandler />);
      });
      return (
        <div>
          {dom}
          <PopupPool />
        </div>
      );
    };
    const wrap = mount(<VDom />);
    setTimeout(() => {
      const actual = wrap.html();
      expect(actual).to.have.string("PageLoadProgress");
      done();
    }, 10);
  });
});

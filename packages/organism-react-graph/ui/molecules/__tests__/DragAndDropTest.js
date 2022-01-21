import React from "react";

import { expect } from "chai";
import { jsdom, mount } from "reshow-unit";

import DragAndDrop from "../DragAndDrop";

describe("Test DragAndDrop", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });
  it("base test", (done) => {
    const Comp = ({ onGetEl }) => <div ref={onGetEl} />;
    const onD3Load = () => {
      wrap.update();
      const html = wrap.html();
      expect(html).to.have.string("div");
      done();
    };
    const wrap = mount(<DragAndDrop component={Comp} onD3Load={onD3Load}/>);
  });
});

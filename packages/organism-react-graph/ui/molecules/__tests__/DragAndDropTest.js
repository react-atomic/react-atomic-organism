import React from "react";

import { expect } from "chai";
import { shallow, mount } from "reshow-unit";

import DragAndDrop from "../DragAndDrop";

describe("Test DragAndDrop", () => {
  it("base test", () => {
    const Comp = ({ onGetEl }) => <div ref={onGetEl} />;
    const uDom = mount(<DragAndDrop component={Comp} />);
    const html = uDom.html();
    expect(html).to.have.string("div");
  });
});

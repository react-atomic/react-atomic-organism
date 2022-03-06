import React from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import FBLike from "../FBLike";

describe("FBLike Test", () => {
  it("basic test", () => {
    const vDom = <FBLike />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

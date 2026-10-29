import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import FBLike from "../FBLike";

describe("FBLike Test", () => {
  it("basic test", () => {
    const vDom = <FBLike />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

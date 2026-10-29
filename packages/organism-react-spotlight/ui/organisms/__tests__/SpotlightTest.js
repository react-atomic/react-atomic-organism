import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import Spotlight from "../Spotlight";

describe("Spotlight Test", () => {
  it("basic test", () => {
    const vDom = <Spotlight />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.equal("");
  });
});

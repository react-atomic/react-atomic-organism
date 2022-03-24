import React from "react";
import { expect } from "chai";

import { mount } from "reshow-unit";
import CodeReadme from "../CodeReadme";

describe("CodeReadme Test", () => {
  it("basic test", () => {
    const vDom = <CodeReadme />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.be.null;
  });
});

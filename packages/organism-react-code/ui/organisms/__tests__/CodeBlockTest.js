import React from "react";
import { expect } from "chai";

import { mount } from "reshow-unit";
import CodeBlock from "../CodeExample";

describe("CodeBlock Test", () => {
  it("basic test", () => {
    const vDom = <CodeBlock />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

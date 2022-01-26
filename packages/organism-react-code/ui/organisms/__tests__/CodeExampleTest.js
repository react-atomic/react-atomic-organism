import React from "react";
import { expect } from "chai";

import { mount } from "reshow-unit";
import CodeExample from "../CodeExample";

describe("CodeExample Test", () => {
  it("basic test", () => {
    const vDom = <CodeExample />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string("div");
  });
});

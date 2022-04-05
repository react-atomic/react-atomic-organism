import React from "react";
import { expect } from "chai";

import { render } from "reshow-unit";
import CodeBlock from "../CodeExample";

describe("CodeBlock Test", () => {
  it("basic test", () => {
    const vDom = <CodeBlock />;
    const wrap = render(vDom);
    expect(wrap.html()).to.have.string("div");
  });
});

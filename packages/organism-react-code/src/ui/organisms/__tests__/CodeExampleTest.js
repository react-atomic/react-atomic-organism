import React from "react";
import { expect } from "chai";

import { render } from "reshow-unit";
import CodeExample from "../CodeExample";

describe("CodeExample Test", () => {
  it("basic test", () => {
    const vDom = <CodeExample />;
    const wrap = render(vDom);
    expect(wrap.html()).to.have.string("div");
  });
});

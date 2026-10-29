import React from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import Preview from "../HtmlPreview";

describe("Test Preview", () => {
  it("simple test", () => {
    const uDom = render(<Preview />);
    const html = uDom.html();
    expect(html).to.have.string("iframe");
  });
});

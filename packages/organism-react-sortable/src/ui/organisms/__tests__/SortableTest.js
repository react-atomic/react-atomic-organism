// @ts-check
import * as React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import { Sort } from "../Sortable";
describe("Sortable Test", () => {
  it("basic test", () => {
    const wrap = render(<Sort />);
    expect(wrap.html()).to.equal("");
  });
});

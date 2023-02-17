//@ts-check

import { expect } from "chai";
import { render } from "reshow-unit";

import Dropdown from "../Dropdown";

describe("Test Dropdown", () => {
  it("simple test", async () => {
    const wrap = render(<Dropdown />);
    const html = wrap.html();
    expect(html).to.have.string("dropdown");
  });
});

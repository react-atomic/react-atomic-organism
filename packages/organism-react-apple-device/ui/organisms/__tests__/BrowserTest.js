import { expect } from "chai";
import { render } from "reshow-unit";

import Browser from "../Browser";

describe("Browser Test", () => {
  it("basic test", () => {
    const wrap = render(<Browser />);
    expect(wrap.html()).to.have.string("div");
  });
});

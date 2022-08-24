import { expect } from "chai";
import { render } from "reshow-unit";

import Highlight from "../Highlight";

describe("Highlight Test", () => {
  it("basic test", () => {
    const wrap = render(<Highlight />);
    expect(wrap.html()).to.equal("");
  });
});

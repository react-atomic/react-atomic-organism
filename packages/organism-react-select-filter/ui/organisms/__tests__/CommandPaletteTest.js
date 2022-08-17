import { expect } from "chai";
import { render } from "reshow-unit";

import CommandPalette from "../CommandPalette";

describe("CommandPalette Test", () => {
  it("basic test", () => {
    const wrap = render(<CommandPalette />);
    expect(wrap.html()).to.equal("");
  });
});

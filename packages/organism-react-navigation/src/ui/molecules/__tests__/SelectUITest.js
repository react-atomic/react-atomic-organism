import { expect } from "chai";
import { render } from "reshow-unit";

import SelectUI from "../SelectUI";

describe("SelectUI Test", () => {
  it("basic test", () => {
    const wrap = render(<SelectUI />);
    expect(wrap.html()).to.have.string("div");
  });
});

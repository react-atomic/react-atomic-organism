import { expect } from "chai";
import { render } from "reshow-unit";

import AjaxLink from "../AjaxLink";

describe("AjaxLink Test", () => {

  it("basic test", () => {
    const wrap = render(<AjaxLink />);
    expect(wrap.html()).to.have.string("</a>");
  });
});

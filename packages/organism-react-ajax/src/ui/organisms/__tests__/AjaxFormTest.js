import { expect } from "chai";
import { render } from "reshow-unit";

import AjaxForm from "../AjaxForm";

describe("AjaxForm Test", () => {
  it("basic test", () => {
    const wrap = render(<AjaxForm />);
    expect(wrap.html()).to.have.string("form");
  });
});

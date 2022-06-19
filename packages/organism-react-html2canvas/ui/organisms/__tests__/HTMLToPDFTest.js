import { expect } from "chai";
import { render } from "reshow-unit";

import HTMLToPDF from "../HTMLToPDF";

describe("Test html2pdf", () => {
  it("basic test", () => {
    const vDom = <HTMLToPDF />;
    const wrap = render(vDom);
    expect(wrap.html()).to.have.string("iframe");
  });
});

import { expect } from "chai";
import { render } from "reshow-unit";

import SortLink from "../SortLink";

describe("SortLink Test", () => {
  it("basic test", () => {
    const vDom = <SortLink />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string('<a data-sort="" data-desc="-1" href="#">');
  });
});

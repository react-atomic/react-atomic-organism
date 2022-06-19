import { expect } from "chai";
import { render } from "reshow-unit";

import SortBy from "../SortBy";

describe("SortBy Test", () => {
  it("basic test", () => {
    const vDom = <SortBy />;
    const wrap = render(vDom);
    const html = wrap.html();
    expect(html).to.have.string('<a data-sort="" data-desc="-1" href="#">');
  });
});

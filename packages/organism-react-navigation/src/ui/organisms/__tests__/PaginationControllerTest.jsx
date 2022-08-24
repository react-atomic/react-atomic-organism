import { expect } from "chai";
import { render, act } from "reshow-unit";

import PaginationController from "../PaginationController";

describe("Test PaginationController", () => {
  it("simple test", () => {
    const wrap = render(<PaginationController />);
    const html = wrap.html();
    expect(html).to.have.string("pagination");
  });
  it("test hide only one", async () => {
    let wrap;
    await act(() => (wrap = render(<PaginationController hideOnlyOne />)), 5);
    const html = wrap.html();
    expect(html).to.equal("");
  });
  it("test have two pages with hideOnlyOne", () => {
    const wrap = render(<PaginationController hideOnlyOne total={20} />);
    const html = wrap.html();
    expect(html).to.have.string("11-20");
  });
});

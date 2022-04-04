import { expect } from "chai";
import { render, act } from "reshow-unit";

import Breadcrumb from "../Breadcrumb";

describe("Test Breadcrumb", () => {
  it("simple test", async () => {
    let wrap;
    await act(() => (wrap = render(<Breadcrumb />)), 5);
    const html = wrap.html();
    expect(html).to.have.string("breadcrumb");
  });
});

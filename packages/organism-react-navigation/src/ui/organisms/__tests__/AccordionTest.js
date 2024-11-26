import { expect } from "chai";
import { render, act } from "reshow-unit";

import Accordion from "../Accordion";

describe("Test Accordion", () => {
  it("simple test", async () => {
    let wrap;
    await act(() => (wrap = render(<Accordion />)), 5);
    const html = wrap.html();
    expect(html).to.have.string("accordion");
  });
});

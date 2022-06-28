import { expect } from "chai";
import { render } from "reshow-unit";

import ScrollAnimate from "../ScrollAnimate";

describe("Test Scroll Animate", () => {

  it("simple test", () => {
    const wrap = render(<ScrollAnimate attachDestRetry={1} />);
    const html = wrap.html();
    expect(html).to.have.string("spy");
  });
});

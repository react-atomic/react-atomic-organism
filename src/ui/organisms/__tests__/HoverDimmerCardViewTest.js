import { expect } from "chai";
import { render } from "reshow-unit";

import HoverDimmerCardView from "../HoverDimmerCardView";

describe("Test HoverDimmerCardView", () => {
  it("basic test", () => {
    const comp = <HoverDimmerCardView />;
    const wrap = render(comp);
    expect(wrap.html()).to.have.string("div");
  });
});

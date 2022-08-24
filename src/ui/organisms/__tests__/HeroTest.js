import { expect } from "chai";
import { render } from "reshow-unit";

import Hero from "../Hero";

describe("Test Hero Component", () => {
  it("basic test", () => {
    const comp = <Hero />;
    const wrap = render(comp);
    expect(wrap.html()).to.have.string("div");
  });
});

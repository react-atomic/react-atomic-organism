import { expect } from "chai";
import { render, jsdom, cleanIt } from "reshow-unit";

import I13nElement from "../I13nElement";

describe("I13nElement test", () => {
  before(() => {
    jsdom(null, { url: "https://localhost" });
  });

  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    const wrap = render(<I13nElement />);
    expect(wrap.html()).to.have.string("div");
  });
});

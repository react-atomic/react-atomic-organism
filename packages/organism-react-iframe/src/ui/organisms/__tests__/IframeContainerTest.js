import { expect } from "chai";
import { render } from "reshow-unit";

import IframeContainer from "../IframeContainer";
describe("Test IframeContainer", () => {
  it("basic test", () => {
    const wrap = render(<IframeContainer />);
    expect(wrap.html()).to.have.string(`loading="lazy"`);
  });
  it("unset loading", () => {
    const wrap = render(<IframeContainer loading={null} />);
    expect(wrap.html()).not.have.string(`loading="lazy"`);
  });
});

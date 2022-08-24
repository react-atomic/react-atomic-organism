import { expect } from "chai";
import {
  render,
  simulateEvent,
  getSinon,
  screen,
  waitFor,
  cleanIt,
} from "reshow-unit";

import OnEnterInput from "../OnEnterInput";

describe("OnEnterInput test", () => {
  afterEach(() => cleanIt());

  it("simple test", async () => {
    const uTestOnEnter = getSinon().spy((e) => {});
    const wrapper = render(<OnEnterInput role="dom" onEnter={uTestOnEnter} />);
    const dom = screen().getByRole("dom");
    const user = simulateEvent();
    await user.type(dom, "{enter}");
    await waitFor(() => {
      expect(uTestOnEnter.called).to.be.true;
    });
  });
});

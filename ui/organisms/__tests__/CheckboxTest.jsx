import { expect } from "chai";
import {
  render,
  simulateEvent,
  getSinon,
  screen,
  waitFor,
  cleanIt,
} from "reshow-unit";

import Checkbox from "../Checkbox";

describe("Test Checkbox Component", () => {
  afterEach(() => cleanIt());

  it("test without disabled", async () => {
    const uTestClick = getSinon().spy((e, before, after) => {});
    const wrapper = render(
      <Checkbox checked afterClick={uTestClick} label="foo" />
    );
    const user = simulateEvent();
    const checkbox = screen().getByLabelText("foo");
    expect(checkbox.checked).to.be.true;
    await user.click(checkbox);
    await waitFor(() => {
      expect(uTestClick.called).to.be.true;
      expect(checkbox.checked).to.be.false;
    });
  });

  it("test disabled", async () => {
    const uTestClick = getSinon().spy((e, before, after) => {});
    const wrapper = render(
      <Checkbox checked disabled afterClick={uTestClick} label="foo" />
    );
    const user = simulateEvent();
    const checkbox = screen().getByLabelText("foo");
    expect(checkbox.checked).to.be.true;
    await user.click(checkbox);
    await waitFor(() => {
      expect(uTestClick.called).to.be.false;
      expect(checkbox.checked).to.be.true;
    });
  });
});

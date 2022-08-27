import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import TagsField from "../TagsField";

describe("Test Tags field", () => {
  it("simple test", () => {
    const vdom = <TagsField />;
    const wrapper = render(vdom);
    expect(wrapper.html()).to.have.string("<div");
  });
});

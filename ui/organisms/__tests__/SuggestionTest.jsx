import React from "react";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Suggestion from "../Suggestion";

describe("Test Suggestion Component", () => {
  it("basic test", () => {
    const comp = <Suggestion />;
    const wrapper = mount(comp);
    const html = wrapper.html();
    expect(html).to.have.string("div");
  });

  it("test set default value", () => {
    const comp = <Suggestion />;
    const wrapper = mount(comp);
    const instance = wrapper.instance();
    wrapper.setProps({ defaultValue: "a" });
    expect(instance.getValue()).to.equal("a");
    wrapper.setProps({ defaultValue: "b" });
    expect(instance.getValue()).to.equal("a");
  });
});

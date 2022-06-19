import React from "react";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import ScrollAnimate from "../ScrollAnimate";

describe("Test Scroll Animate", () => {
  it("simple test", () => {
    const uDom = mount(<ScrollAnimate />);
    const html = uDom.html();
    expect(html).to.have.string("spy-tar-spy-0");
  });
});

import React, { Component } from "react";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Preview from "../HtmlPreview";

describe("Test Preview", () => {
  it("simple test", () => {
    const uDom = mount(<Preview />);
    const html = uDom.html();
    expect(html).to.have.string("iframe");
  });
});

import React from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import sinon from "sinon";
const sandbox = sinon.createSandbox();

import Carousel from "../Carousel";

describe("test carousel", () => {
  it("basic test", () => {
    const VDom = (props) => {
      return <Carousel />;
    };
    const wrap = mount(<VDom />);
  });
});

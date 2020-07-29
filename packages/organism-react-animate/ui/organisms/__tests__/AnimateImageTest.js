import React, { useRef, useEffect } from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import jsdom from "jsdom-global";

import AnimateImage from "../AnimateImage";

var options = {
  // Use the current working directory as the document's origin, so
  // requests to local files work correctly with CORS.
  url: "file://" + process.cwd() + "/",
  features: {
    FetchExternalResources: ["img", "script"]
  },
  resources: "usable"
};

describe("Test Animate Image", () => {
  let reset;
  before(() => {
    reset = new jsdom("", options);
  });

  it("basic test", done => {
    const VDom = props => {
      const ref = useRef();

      useEffect(()=>{
        const oImg = ref.current.getImageObject();
        oImg.onload();
      });

      return <AnimateImage ref={ref} src="http://localhost/xxx.png" />;
    };
    const wrap = mount(<VDom />);
    setTimeout(() => {
      wrap.update();
      const html = wrap.html();
      expect(html).to.have.string("xxx.png");
      done();
    }, 300);
  });
});

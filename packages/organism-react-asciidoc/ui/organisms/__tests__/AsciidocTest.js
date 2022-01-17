import React, { Component } from "react";
import gJsdom from "jsdom-global";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Asciidoc from "../Asciidoc";

describe("Test Asciidoc", () => {
  it("simple test", (done) => {
    const adoc = `
:toc:
:toc-placement!:
toc::[]

= h1 - test
test
`;
    class Comp extends Component {
      render() {
        return <Asciidoc ref={(el) => (this.el = el)}>{adoc}</Asciidoc>;
      }
    }
    const el = document.createElement("div");
    document.body.appendChild(el);
    const wrap = mount(<Comp />, { attachTo: el });
    setTimeout(() => {
      const obj = wrap.instance();
      const html = obj.el.getBody().innerHTML;
      expect(html).to.have.string("div");
      done();
    }, 100);
  });
});

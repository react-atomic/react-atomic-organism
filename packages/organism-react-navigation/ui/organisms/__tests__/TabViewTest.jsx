import React from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import TabView from "../TabView";
import Tab from "../Tab";

describe("Test TabView", () => {
  it("basic test", ()=>{
    const Test = props => {
      return (
        <TabView>
          <Tab><div>tab1</div></Tab>
        </TabView>
      );
    };
    const wrap = mount(<Test />);
    const html = wrap.html();
    expect(html).to.have.string("tab1");
    expect(html).to.have.string('data-selected="true"');
  });
});

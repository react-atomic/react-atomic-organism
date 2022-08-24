import React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import TabView from "../TabView";
import Tab from "../Tab";

describe("Test TabView", () => {
  it("basic test", () => {
    const Test = (props) => {
      return (
        <TabView>
          <Tab>
            <div>tab1</div>
          </Tab>
        </TabView>
      );
    };
    const wrap = render(<Test />);
    const html = wrap.html();
    expect(html).to.have.string("tab1");
    expect(html).to.have.string('data-selected="true"');
  });
});

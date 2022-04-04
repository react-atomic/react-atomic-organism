import React from "react";
import { expect } from "chai";
import { jsdom, render, waitFor, act } from "reshow-unit";

import MultiChart from "../MultiChart";

describe("Test mulit chart", () => {
  beforeEach(() => {
    jsdom(null, { runScripts: "dangerously", resources: "usable" });
  });

  it("basic test", async () => {
    const Dom = (props) => {
      return (
        <div>
          <MultiChart onD3Load={onD3Load} />
        </div>
      );
    };
    const onD3Load = () => {};
    let wrap;
    await act(() => (wrap = render(<Dom />)), 10);
    await waitFor(() => {
      act(() => expect(wrap.html()).to.have.string("svg"));
    });
  });
});

import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import { PopupPool } from "organism-react-popup";
import PageLoadProgressHandler from "../PageLoadProgressHandler";
import { createReducer } from "reshow-flux-base";

describe("Test PageLoadProgressHandler", () => {
  it("basic test", async () => {
    const [fakeStore] = createReducer();
    const VDom = () => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(<PageLoadProgressHandler store={fakeStore} />);
      });
      return (
        <div>
          {dom}
          <PopupPool />
        </div>
      );
    };
    const wrap = render(<VDom />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string("PageLoadProgress");
    });
  });
});

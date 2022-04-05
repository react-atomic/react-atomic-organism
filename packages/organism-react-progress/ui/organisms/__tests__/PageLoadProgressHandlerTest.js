import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import { PopupPool } from "organism-react-popup";
import PageLoadProgressHandler from "../PageLoadProgressHandler";

describe("Test PageLoadProgressHandler", () => {
  it("basic test", async () => {
    const VDom = (props) => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(<PageLoadProgressHandler />);
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
      act(() => {
        expect(wrap.html()).to.have.string("PageLoadProgress");
      });
    });
  });
});

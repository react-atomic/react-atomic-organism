import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";

import PopupOverlay from "../PopupOverlay";
import DisplayPopupEl from "../../organisms/DisplayPopupEl";
import PopupPool from "../../organisms/PopupPool";

describe("Test PopupOverlay", () => {
  it("basic test", async () => {
    const VDom = (props) => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(
          <DisplayPopupEl>
            <PopupOverlay id="my-overlay" />
          </DisplayPopupEl>
        );
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
      act(() => expect(wrap.html()).to.have.string('id="my-overlay"'));
    });
  });
});

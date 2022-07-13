import { useState, useEffect } from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";

import PopupModal from "../PopupModal";
import DisplayPopupEl from "../../organisms/DisplayPopupEl";
import PopupPool from "../../organisms/PopupPool";

describe("Test PopupModal", () => {
  it("basic test", async () => {
    const VDom = (props) => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(
          <DisplayPopupEl>
            <PopupModal id="my-id" />
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
    await waitFor(()=>{
      expect(wrap.html()).to.have.string('id="my-id"');
    });
    wrap.unmount();
  });
});

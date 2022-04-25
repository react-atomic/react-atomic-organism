import { useState, useEffect } from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";

import PopupFloatEl from "../PopupFloatEl";
import DisplayPopupEl from "../../organisms/DisplayPopupEl";
import PopupPool from "../../organisms/PopupPool";

describe("Test PopupFloatEl", () => {
  it("basic test", async () => {
    const VDom = (props) => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(
          <DisplayPopupEl>
            <PopupFloatEl id="my-float" />
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
      act(()=>expect(wrap.html()).to.have.string('id="my-float"'));
    });
  });
});

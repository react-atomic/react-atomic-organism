import React from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import ProgressBar from "../ProgressBar";

describe("Test ProgressBar", () => {
  it("basic test", async () => {
    const VDom = (props) => (
      <div>
        <ProgressBar />
      </div>
    );
    const wrap = render(<VDom />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string("progress ui");
    });
  });
});

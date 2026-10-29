import React from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import Dropzone from "../Dropzone";

describe("Test Dropzone", () => {
  it("simple test", async () => {
    const wrap = render(<Dropzone postUrl="http://xxx" />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string('class="dropzone ui"');
    });
  });
});

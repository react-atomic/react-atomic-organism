import React, { useState, useEffect } from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import PopupClick from "../PopupClick";

describe("Test PopupClick", () => {
  it("basic test", async () => {
    const wrap = render(<PopupClick />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string("popup-click");
    });
  });
});

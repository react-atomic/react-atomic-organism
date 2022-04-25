import React, { Component } from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import Dialog from "../Dialog";

describe("Test Dialog", () => {
  it("simple test", async () => {
    const wrap = render(<Dialog />);
    await waitFor(() => {
      expect(wrap.html()).to.have.string("div");
    });
  });
});

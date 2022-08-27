import React, { Component } from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";

import AlertsNotifier from "../AlertsNotifier";

describe("Test AlertsNotifier", () => {
  it("simple test", async () => {
    const wrap = render(<AlertsNotifier alerts={["1"]} />);
    await waitFor(() => {
      act(() => expect(wrap.html()).to.have.string("div"));
    });
  });
});

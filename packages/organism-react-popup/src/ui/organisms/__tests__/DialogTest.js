// @ts-check

import * as React from "react";
import { expect } from "chai";
import { render, waitFor, act } from "reshow-unit";

import Dialog from "../Dialog";

describe("Test Dialog", () => {
  it("simple test", async () => {
    const wrap = render(<Dialog />);
    await act();
    await waitFor(() => () => expect(wrap.html()).to.have.string("div"));
    await act(()=>wrap.unmount());
  });
});

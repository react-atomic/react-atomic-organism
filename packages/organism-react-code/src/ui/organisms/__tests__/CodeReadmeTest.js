import React from "react";
import { expect } from "chai";

import { render, waitFor, act } from "reshow-unit";
import CodeReadme from "../CodeReadme";

describe("CodeReadme Test", () => {
  it("basic test", async () => {
    const vDom = <CodeReadme />;
    const wrap = render(vDom);
    await waitFor(() => {
      act(() => expect(wrap.html()).to.equal(""));
    });
  });
});

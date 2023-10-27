//@ts-check

import { expect } from "chai";
import useTurnstile from "../useTurnstile";
import * as React from "react";
import { render } from "reshow-unit";

describe("useTurnstile Test", () => {
  it("basic test", () => {
    const Comp = () => {
      const [TurnstileElement] = useTurnstile({});
      return TurnstileElement;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
  });
});

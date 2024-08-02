//@ts-check

import { expect } from "chai";
import useTurnstile from "../useTurnstile";
import * as React from "react";
import { render, hideConsoleError, cleanIt } from "reshow-unit";

describe("useTurnstile Test", () => {
  beforeEach(()=>cleanIt());
  it("has sitekey test", () => {
    const Comp = () => {
      const [TurnstileElement] = useTurnstile({ sitekey: "fake" });
      return TurnstileElement;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
  });
  it("disable sitekey test", () => {
    const Comp = () => {
      const [TurnstileElement] = useTurnstile({ sitekey: null });
      return TurnstileElement;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("");
  });
  it("without sitekey test", () => {
    const Comp = () => {
      const [TurnstileElement] = useTurnstile({});
      return TurnstileElement;
    };
    hideConsoleError();
    expect(() => render(<Comp />)).to.throw();
  });
});

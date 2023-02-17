//@ts-check
import { useRef, useEffect } from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import { Filter } from "../Filter";

describe("Test Filter Component", () => {
  it("basic test", () => {
    const Comp = () => <div />;
    const comp = <Filter component={Comp} />;
    const wrapper = render(comp);
    const html = wrapper.html();
    expect(html).to.have.string("div");
  });

  it("test ref", () => {
    const Comp = () => <div />;
    const FComp = () => {
      const el = useRef();
      useEffect(() => {
        expect(null != el.current).to.be.true;
      }, []);
      return <Filter component={Comp} ref={el} />;
    };
    const wrapper = render(<FComp />);
    const html = wrapper.html();
    expect(html).to.have.string("div");
  });
});

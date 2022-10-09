import { useState } from "react";
import { expect } from "chai";
import {
  render,
  act,
  waitFor,
  getRoleHtml,
  hideConsoleError,
  cleanIt,
} from "reshow-unit";

import Animate from "../Animate";
import AnimateGroup from "../AnimateGroup";

describe("AnimateGroup Test", () => {
  it("Animate Test", () => {
    const vDom = (
      <Animate>
        <div>abc</div>
      </Animate>
    );
    const wrap = render(vDom);
    expect(wrap.html()).to.have.string("animate-group");
  });

  it("Test handleExit", async () => {
    let uFake;
    const FakeComp = (props) => {
      const [state, setState] = useState(() => <div role="child">abc</div>);
      uFake = setState;
      return (
        <AnimateGroup role="ani" lazy={1} timeout={{ appear: 1 }}>
          {state}
        </AnimateGroup>
      );
    };
    const wrap = render(<FakeComp />);
    await waitFor(() => {
      act(() => expect(wrap.html()).to.have.string(`role="child"`));
    });
    await act(() => uFake(), 10);
    await waitFor(() => {
      act(() => expect(wrap.html()).not.have.string(`role="child"`));
    });
    wrap.unmount();
  });
});

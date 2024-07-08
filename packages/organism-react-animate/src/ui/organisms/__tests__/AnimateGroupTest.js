import { useState } from "react";
import { expect } from "chai";
import { render, act, waitFor, sleep } from "reshow-unit";

import Animate from "../Animate";
import AnimateGroup from "../AnimateGroup";

describe("AnimateGroup Test", () => {
  it("Animate Test", async () => {
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
    const FakeComp = (_props) => {
      const [state, setState] = useState(() => <div role="child">abc</div>);
      uFake = setState;
      return (
        <AnimateGroup role="ani" lazy={1} timeout={{ appear: 1 }}>
          {state}
        </AnimateGroup>
      );
    };
    const wrap = render(<FakeComp />);
    await act();
    await waitFor(() => {
      expect(wrap.html()).to.have.string(`role="child"`);
    });
    await act();
    await act(() => uFake());
    await act();
    await waitFor(() => {
      act(()=>{
      expect(wrap.html()).not.have.string(`role="child"`);
      });
    }, 1500);
    await sleep(()=>wrap.unmount());
  });
});

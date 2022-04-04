import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import Transition from "../Transition";
import { dataStatusKey } from "../../../src/const";
import { SemanticUI } from "react-atomic-molecule";

describe("Test Transition", () => {
  it("basic test", () => {
    return;
    const vDom = (
      <Transition>
        <div />
      </Transition>
    );
    const wrap = render(vDom);
    waitFor(() => {
      expect(wrap.html()).to.have.string(`${dataStatusKey}="exited"`);
    });
  });

  it("test in=true", () => {
    return;
    const vDom = (
      <Transition in>
        <div />
      </Transition>
    );
    const wrap = render(vDom);
    waitFor(() => {
      expect(wrap.html()).to.have.string(`${dataStatusKey}="entering"`);
    });
  });

  it("test entered", async () => {
    const end = () => {};
    const vDom = (
      <Transition in enter appear addEndListener={end}>
        <SemanticUI />
      </Transition>
    );
    const wrap = render(vDom);
    await waitFor(() => {
      act(() =>
        expect(wrap.html()).to.have.string(`${dataStatusKey}="entering"`)
      );
    });
    await waitFor(() => {
      expect(wrap.html()).to.have.string(`${dataStatusKey}="entered"`);
    });
  });
});

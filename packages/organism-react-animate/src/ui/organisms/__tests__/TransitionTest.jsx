import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import Transition from "../Transition";
import { dataStatusKey } from "../../../const";
import { SemanticUI } from "react-atomic-molecule";

describe("Test Transition", () => {
  it("basic test", async () => {
    const vDom = (
      <Transition>
        <div />
      </Transition>
    );
    const wrap = render(vDom);
    await act(() => {
      expect(wrap.html()).to.have.string(`${dataStatusKey}="exited"`);
    });
    await act();
  });

  it("test in=true", async () => {
    const vDom = (
      <Transition in>
        <div />
      </Transition>
    );
    const wrap = render(vDom);
    await act(() => {
      expect(wrap.html()).to.have.string(`${dataStatusKey}="entered"`);
    });
    await waitFor(() => {
      act(() => {
        expect(wrap.html()).to.have.string(`${dataStatusKey}="entering"`);
      });
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
      act(() =>
        expect(wrap.html()).to.have.string(`${dataStatusKey}="entered"`)
      );
    });
    wrap.unmount();
  });
});

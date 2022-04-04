import { useState } from "react";

import { expect } from "chai";
import { render, act } from "reshow-unit";

import Suggestion from "../Suggestion";

describe("Test Suggestion Component", () => {
  it("basic test", () => {
    const comp = <Suggestion />;
    const wrapper = render(comp);
    const html = wrapper.html();
    expect(html).to.have.string("div");
  });

  it("test set default value", async () => {
    let uFake;
    let uFakeSet;
    const Comp = (props) => {
      const [state, setState] = useState();
      uFakeSet = setState;
      return (
        <Suggestion
          data-value={state}
          ref={(el) => (uFake = el)}
          defaultValue={state}
        />
      );
    };

    render(<Comp />);
    await act(() => uFakeSet("a"));
    expect(uFake.getValue()).to.equal("a");
    await act(() => uFakeSet("b"));
    expect(uFake.getValue()).to.equal("a");
    expect(uFake.props["data-value"]).to.equal("b");
  });
});

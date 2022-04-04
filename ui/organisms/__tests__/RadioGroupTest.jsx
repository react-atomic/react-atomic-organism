import { useState } from "react";

import { expect } from "chai";
import { render, act } from "reshow-unit";

import RadioGroup from "../RadioGroup";

describe("Test Radio Group Component", () => {
  it("test simple", () => {
    const wrapper = render(<RadioGroup options={[]} name="" />);
    expect(wrapper.html()).to.have.string("div");
  });

  it("test pass empty", () => {
    const options = [{ label: "a", value: "" }];
    let uFake;
    const Comp = (props) => {
      return (
        <RadioGroup
          ref={(el) => (uFake = el)}
          options={options}
          value=""
          name=""
        />
      );
    };
    const wrapper = render(<Comp />);
    expect(uFake.getValue()).to.equal("");
  });

  it("test set default value", async () => {
    const options = [
      { label: "a", value: "a" },
      { label: "b", value: "b" },
      { label: "c", value: "c" },
    ];
    let uFake;
    let uFakeSet;
    const Comp = (props) => {
      const [state, setState] = useState();
      uFakeSet = setState;
      return (
        <RadioGroup
          ref={(el) => (uFake = el)}
          options={options}
          name=""
          defaultValue={state}
        />
      );
    };
    const wrapper = render(<Comp />);
    expect(uFake.getValue()).to.be.undefined;
    await act(() => uFakeSet("a"));
    expect(uFake.getValue()).to.equal("a");
    await act(() => uFakeSet("b"));
    expect(uFake.getValue()).to.equal("a");
  });

  it("test getValue not found", () => {
    const options = [{ label: "a", value: "" }];
    let uFake;
    const Comp = (props) => {
      return (
        <RadioGroup
          ref={(el) => (uFake = el)}
          options={options}
          value={null}
          name=""
        />
      );
    };
    const wrapper = render(<Comp />);
    expect(uFake.getValue()).to.be.undefined;
  });
});

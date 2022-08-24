import { PureComponent } from "react";
import { expect } from "chai";
import { render, act } from "reshow-unit";

import Select from "../Select";

describe("Test Select", () => {
  it("should reset value by assign empty string", async () => {
    let uFake;
    class TestComp extends PureComponent {
      constructor(props) {
        super(props);
        uFake = this;
      }
      state = { v: null };
      setv = (v) => this.setState({ v });
      render() {
        const { v } = this.state;
        return <Select ref={(el) => (this.el = el)} value={v} />;
      }
    }
    const wrap = render(<TestComp />);
    await act(() => {
      uFake.el.handleSelect({
        label: "mylabel",
        value: "myvalue",
      })();
    }, 5);
    expect(uFake.el.state).to.deep.equal({ value: "myvalue" });
    await act(() => uFake.setv(""), 5);
    expect(uFake.el.state).to.deep.equal({
      value: "",
      prevValue: "",
    });
  });
});

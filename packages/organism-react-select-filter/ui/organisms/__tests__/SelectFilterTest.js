import { expect } from "chai";
import { render } from "reshow-unit";

import SelectFilter from "../SelectFilter";

describe("SelectFilter Test", () => {
  it("basic test", () => {
    const wrap = render(<SelectFilter />);
    expect(wrap.html()).to.have.string("select-filter");
  });
});

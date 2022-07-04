import { expect } from "chai";
import {getSinon as sinon} from "reshow-unit-dom";

import notify from "../index";

describe("Test call", () => {
  it("basic test", ()=>{
    const spy = sinon().spy();
    notify("foo", null, null, spy);
    expect(spy.callCount).to.equal(1);
  });
});

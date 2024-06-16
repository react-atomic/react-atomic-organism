import { getSinon } from "reshow-unit";
import { expect } from "chai";
import superagent from "superagent";

import worker from "../worker";

describe("Worker Test", () => {
  it("test pass method", () => {
    getSinon().spy(superagent, "put");
    worker.postMessage({
      type: "ajaxPost",
      params: {
        url: "http://localhost",
        method: "put",
      },
    });
    expect(superagent.put.callCount).to.equal(1);
  });
});

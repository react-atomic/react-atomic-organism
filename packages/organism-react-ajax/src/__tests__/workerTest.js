import { expect } from "chai";
import { getSinon } from "reshow-unit";
import req from "superagent";

import worker from "../worker";

describe("Worker Test", () => {
  it("test pass method", () => {
    getSinon().spy(req, "put");
    worker.postMessage({
      type: "ajaxPost",
      params: {
        url: "http://localhost",
        method: "put",
      },
    });
    expect(req.put.callCount).to.equal(1);
  });
});

//@ts-check

import { expect } from "chai";
import { getSinon as sinon } from "reshow-unit";
import checkClient from "../checkClient";

function jsonOk() {
  var mockResponse = new Response(JSON.stringify({}), {
    //the fetch API returns a resolved window Response object
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });

  return Promise.resolve(mockResponse);
}

describe("checkClient Test", () => {
  let stub;
  beforeEach(() => {
    stub = sinon().stub(globalThis, "fetch");
    stub.onCall(0).returns(jsonOk());
    stub.onCall(1).returns(jsonOk());
  });

  afterEach(() => {
    stub.restore(); //remove stub
  });

  it("basic test", async () => {
    const result = await checkClient();
    expect(result.success).to.be.true;
  });
});

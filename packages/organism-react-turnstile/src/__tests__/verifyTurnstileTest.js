//@ts-check

import { expect } from "chai";
import { getSinon as sinon } from "reshow-unit";
import verifyTurnstile from "../verifyTurnstile";

function jsonOk(body={}) {
  var mockResponse = new Response(JSON.stringify(body), {
    //the fetch API returns a resolved window Response object
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });

  return Promise.resolve(mockResponse);
}

describe("verifyTurnstile Test", () => {
  let stub;
  beforeEach(() => {
    stub = sinon().stub(globalThis, "fetch");
  });

  afterEach(() => {
    stub.restore(); //remove stub
  });

  it("basic test", async () => {
    stub.onCall(0).returns(jsonOk({success: true}));
    const result = await verifyTurnstile();
    expect(result.success).to.be.true;
  });
});

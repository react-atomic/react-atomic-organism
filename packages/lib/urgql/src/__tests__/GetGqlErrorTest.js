//@ts-check

import { expect } from "chai";
import { handleGqlError } from "../getGqlError";

describe("handleGqlError Test", () => {
  it("test without json", () => {
    const fakeJson = `
      {
        "graphQLErrors": [
          {"originalError": {
            "message": "fakeError"
          }}
        ]
      }
    `;
    const fakeData = JSON.parse(fakeJson);
    const s = handleGqlError(fakeData);
    expect(s).to.equal("fakeError");
  });
  it("test with json", () => {
    const fakeJson = `
      {
        "graphQLErrors": [
          {"originalError": {
            "message": "[1,2,3]"
          }}
        ]
      }
    `;
    const fakeData = JSON.parse(fakeJson);
    const o = handleGqlError(fakeData);
    expect(o).to.deep.equal([1, 2, 3]);
  });
});

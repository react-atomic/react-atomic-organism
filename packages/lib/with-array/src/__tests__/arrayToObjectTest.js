import { expect } from "chai";

import {arrayToObject} from "../index";

describe("Test arrayToObject", () => {
  it("test arrayToObject", () => {
    const a = [
      { foo: 1, bar: 2 },
      { foo: 3, bar: 4 },
    ];
    const acture = arrayToObject(a, "foo");
    const expected = {
      1: { foo: 1, bar: 2 },
      3: { foo: 3, bar: 4 },
    };
    expect(acture).to.deep.equal(expected);
  });
});

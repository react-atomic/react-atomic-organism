import { expect } from "chai";
import { localStorage } from "../index";

describe("Test storage", () => {
  before(() => {
    global.window = {
      localStorage: {
        getItem: (v) => v,
      },
    };
  });

  it("basic test", () => {
    const a = localStorage("a")();
    expect(a).to.equal("a");
  });
});

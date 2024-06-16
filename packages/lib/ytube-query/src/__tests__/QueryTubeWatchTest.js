// @ts-check

import { expect } from "chai";

import { queryTubeWatch } from "../queryTubeWatch";

describe("QueryTubeWatch Test", () => {
  it("test video is ok", async () => {
    const actual = await queryTubeWatch("CjxugyZCfuw");
    expect(actual.success).to.be.true;
  });
  it("test video is failed", async () => {
    const actual = await queryTubeWatch("pqabxBKzZ6M");
    expect(actual.success).to.be.false;
  });
});

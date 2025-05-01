// @ts-check

import { expect } from "chai";

import { queryTubeSearch } from "../queryTubeSearch";

describe("QueryTubeSearch Test", () => {
  it("basic test", async () => {
    const data = await queryTubeSearch("united states live news", {
      isLive: true,
    });
    expect(!!data.length).to.be.true;
    data.forEach((item) => {
      expect(item).to.have.all.keys(["videoId", "watching", "title", "description", "channelId", "channelName", "channelUrl"]);
    });
  });
});

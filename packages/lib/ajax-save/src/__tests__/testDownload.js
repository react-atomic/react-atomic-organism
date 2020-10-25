import { expect } from "chai";
import download from "../download";

describe("Test Download", () => {
  before(() => {
    window.URL.createObjectURL = () => {};
  });

  it("test doc", () => {
    download("foo", "bar", null, true);
    const a = document.getElementsByTagName("a");
    expect(a.length).to.equal(1);
  });
});

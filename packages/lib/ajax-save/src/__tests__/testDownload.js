import { expect } from "chai";
import { jsdom, getSinon, hideConsoleError } from "reshow-unit-dom";
import download from "../download";
import downloadUtf8 from "../downloadUtf8";

describe("Test Download", () => {
  beforeEach(() => {
    jsdom();
    getSinon()
      .stub(window, "URL")
      .value({
        createObjectURL: () => {},
      });
    hideConsoleError();
  });

  it("test download", () => {
    download("foo", "bar", null, true);
    const a = document.getElementsByTagName("a");
    expect(a.length).to.equal(1);
  });

  it("test download utf8", () => {
    downloadUtf8("foo", "bar", null, true);
    const a = document.getElementsByTagName("a");
    expect(a.length).to.equal(1);
  });
});

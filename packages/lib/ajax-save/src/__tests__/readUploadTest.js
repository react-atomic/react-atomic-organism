// @ts-check
import { expect } from "chai";
import readUpload from "../readUpload";

describe("Test readUpload", () => {
  beforeEach(() => {
    global.File = window.File;
  });
  it("test read upload", async () => {
    const fakeFile = new File(["FOO"], "foo.txt", { type: "text/plain" });
    const fileContent = await readUpload(fakeFile);
    expect(fileContent).to.equal("FOO");
  });
});

// @ts-check
import { expect } from "chai";
import readUpload from "../readUpload";

describe("Test readUpload", () => {
  it("test read upload", async () => {
    document.body.innerHTML = '<input type="file">';
    const simFile = new File(["FOO"], "foo.txt");
    const fileContent = await readUpload(simFile);
    expect(fileContent).to.equal("FOO");
  });
});

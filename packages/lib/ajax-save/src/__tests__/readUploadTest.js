import { expect } from "chai";
import readUpload from "../readUpload";

describe("Test readUpload", () => {
  it("test read upload", (done) => {
    document.body.innerHTML = '<input type="file">';
    const simFile = new Blob(["FOO"], { type: "text/plain;charset=utf-8" });
    const inputFileEl = document.getElementsByTagName("input")[0];
    Object.defineProperty(inputFileEl, "files", {
      value: [simFile],
    });
    const fileContent = readUpload(inputFileEl.files[0]);
    fileContent.then((c) => {
      expect(c).to.equal("FOO");
      done();
    });
  });
});

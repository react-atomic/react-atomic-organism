import { expect } from "chai";
import { win } from "win-doc";

import nonWorker from "../index";

describe("Test Non Worker", () => {
  it("simulate support worker", () => {
    // simulate inside worker
    global.onmessage = () => {};
    global.postMessage = null;
    const oNonWorker = new nonWorker((e) => {
      expect(e).to.deep.equal({ data: "fake" });
    });
    const post = (payload) => {
      oNonWorker.post.call(this, payload);
    };
    // simulate outside worker
    oNonWorker.addEventListener("message", (e) => {
      expect(e).to.deep.equal({ data: "bar" });
    });

    // post from outside
    oNonWorker.postMessage("fake");

    // post from inside
    post("bar");
  });
  it("simulate without worker", () => {
    // simulate inside worker
    global.onmessage = null;
    global.postMessage = null;
    win().__null = false;
    const oNonWorker = new nonWorker((e) => {
      expect(e).to.deep.equal({ data: "fake" });
    });
    const post = (payload) => {
      oNonWorker.post.call(this, payload);
    };
    // simulate outside worker
    oNonWorker.addEventListener("message", (e) => {
      expect(e).to.deep.equal({ data: "bar" });
    });

    // post from outside
    oNonWorker.postMessage("fake");

    // post from inside
    post("bar");
  });
});

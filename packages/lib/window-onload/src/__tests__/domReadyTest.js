import { expect } from "chai";
import jsdom from "jsdom-global";

import windowOnLoad from "../index";


describe("Test Dom Ready", () => {
  let reset;

  beforeEach(() => {
    reset = jsdom();
  });

  afterEach(() => {
    reset();
  });

  it("domReady test", (done) => {
    let i = 0;
    Object.defineProperty(document, "readyState", {
      get() {
        if (!i) {
          i++;
          return "loading";
        } else if (i <= 55) {
          i++;
          return "interactive";
        } else {
          return "complete";
        }
      },
    });
    const load = windowOnLoad({ domReady: true });
    load.process(() => {
      expect(document.readyState).to.equal("interactive");
      done();
    });
  });

});

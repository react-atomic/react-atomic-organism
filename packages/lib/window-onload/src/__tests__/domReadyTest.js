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
        } else if (i <= 150) {
          i++;
          return "interactive";
        } else {
          return "complete";
        }
      },
    });
    const load = windowOnLoad({ domReady: true });
    load[0]((state) => {
      expect(state).to.equal("interactive");
      done();
    });
  });

  it("run with complete", (done) => {
    let i = 0;
    Object.defineProperty(document, "readyState", {
      get() {
        if (!i) {
          i++;
          return "loading";
        } else if (i <= 2) {
          i++;
          return "interactive";
        } else {
          return "complete";
        }
      },
    });
    const load = windowOnLoad({ domReady: true });
    load[0]((state) => {
      expect(state).to.equal("complete");
      done();
    });
  });
});

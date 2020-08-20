import { expect } from "chai";
import jsdom from "jsdom-global";

import windowOnLoad from "../index";

describe("Test window onload", () => {
  let reset;

  beforeEach(() => {
    reset = jsdom();
  });

  afterEach(() => {
    reset();
  });

  it("basic test", (done) => {
    const load = windowOnLoad();
    load.process(() => {
      done();
    });
  });

  it("domReady test", (done) => {
    Object.defineProperty(document, "readyState", {
      get() {
        return "interactive";
      },
    });
    const load = windowOnLoad({ domReady: true });
    load.process(() => {
      expect(document.readyState).to.equal("interactive");
      done();
    });
  });

  it("test timeout", (done) => {
    Object.defineProperty(document, "readyState", {
      get() {
        return "loading";
      },
    });
    const load = windowOnLoad({ timeout: 1000 });
    load.process(() => {
      done();
    });
  });

  it("test close", (done) => {
    Object.defineProperty(document, "readyState", {
      get() {
        return "loading";
      },
    });
    const load = windowOnLoad();
    load.process(() => {});
    setTimeout(() => {
      load.close(), done();
    }, 100);
  });
});

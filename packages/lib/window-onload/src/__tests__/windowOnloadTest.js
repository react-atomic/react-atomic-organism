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
    load[0](() => {
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
    load[0]((state) => {
      expect(state).to.equal(1000);
      done();
    });
  });

  it("test close", (done) => {
    let i = 0;
    Object.defineProperty(document, "readyState", {
      get() {
        i++;
        return "loading";
      },
    });
    const load = windowOnLoad();
    load[0](() => {});
    load[1]();
    setTimeout(() => {
      expect(i).to.equal(2);
      done();
    }, 100);
  });

  it("test call process multiple times", (done) => {
    let i = 0;
    let fakeStatus = "loading";
    Object.defineProperty(document, "readyState", {
      get() {
        i++;
        return fakeStatus;
      },
    });
    const load = windowOnLoad();
    let foo;
    let bar;
    const reset = () => {
      foo = false;
      bar = false;
    };
    reset();
    load[0](() => {
      foo = true;
    });
    load[0](() => {
      bar = true;
    });
    fakeStatus = "complete";
    setTimeout(() => {
      expect({ foo, bar }).to.deep.equal({
        foo: false,
        bar: true,
      });
      reset();
      expect({ foo, bar }).to.deep.equal({
        foo: false,
        bar: false,
      });
      load[0](() => {
        foo = true;
      });
      load[0](() => {
        bar = true;
      });
      expect({ foo, bar }).to.deep.equal({
        foo: true,
        bar: true,
      });
      done();
    }, 50);
  });
});

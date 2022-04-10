import { expect } from "chai";
import { Storage, localStorage } from "../index";

describe("Test storage", () => {
  let fakeStore;
  beforeEach(() => {
    fakeStore = {}; 
    global.window = {
      localStorage: {
        getItem: (k) => fakeStore[k],
        setItem: (k, v) => fakeStore[k] = v,
      },
    };
  });

  it("basic test", () => {
    localStorage("a")("b");
    const a = localStorage("a")();
    expect(a).to.equal("b");
  });

  it("basic Storage test", () => {
    const fakeStorage = new Storage(localStorage);
    fakeStorage.set('c', 'd');
    expect(fakeStore).to.deep.equal({ c: '3,"d"' });
    const c = fakeStorage.get('c');
    expect(c).to.equal('d');
  });
});

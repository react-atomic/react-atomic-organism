import { expect } from "chai";
import Storage, { parseField, encode, decode } from "../Storage";
import { UNDEFINED } from "reshow-constant";

const fakeSetter = (store) => (key) => (value) => {
  if (UNDEFINED === typeof value) {
    return store[key];
  } else {
    if (null == value) {
      return delete store[key];
    } else {
      store[key] = value;
    }
  }
};

describe("Storage", () => {
  it("Storage / parseField", () => {
    const s = "10,abcdefghij";
    const [len, val] = parseField(s);
    expect(len).to.equal(10);
    expect(val).to.equal("abcdefghij");
  });
  it("Storage / encode, decode", () => {
    const o = { foo: "bar" };
    const sEncode = encode(o);
    expect(sEncode).to.equal('13,{"foo":"bar"}');
    expect(decode(sEncode)).to.deep.equal(o);
  });
  it("test storage / set, get", () => {
    const fakeStore = {};
    const fakeStorage = new Storage(
      fakeSetter(fakeStore)
    );
    let foo = fakeStorage.get('foo');
    expect(foo).to.be.undefined;
    foo = fakeStorage.set('foo', 'bar');
    expect(fakeStore).to.deep.equal(
      { foo: '5,"bar"' }
    );
    expect(foo.get('foo')).to.equal("bar");
  });
  it("test merge / merge same value", ()=>{
    const fakeStore = {};
    const fakeStorage = new Storage(
      fakeSetter(fakeStore)
    );
    const result = fakeStorage.merge({foo: "bar"});
    expect(result.get('foo')).to.equal("bar");
    const result2 = result.merge({foo: "bar"});
    expect(result === result2).to.be.true;
  });
  it("test merge / merge different value", ()=>{
    const fakeStore = {};
    const fakeStorage = new Storage(
      fakeSetter(fakeStore)
    );
    const result = fakeStorage.merge({foo: "bar"});
    expect(result.get('foo')).to.equal("bar");
    const result2 = result.merge({foo: "bar1"});
    expect(result === result2).to.be.false;
  });
});

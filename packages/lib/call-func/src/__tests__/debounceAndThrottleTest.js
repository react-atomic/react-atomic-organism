import { expect } from "chai";
import sinon from 'sinon';
import { debounce, throttle } from "../index.js";

describe("Test debounce", () => {
  it('test debounce', (done)=>{
    const spy = sinon.spy();
    const run = debounce(spy, 10);
    for(let i = 0; i < 5; i++ ) {
      run();
    }
    setTimeout(()=>{
      expect(spy.callCount).to.equal(1);
      done();
    }, 100);
  });
});

describe("Test throttle", () => {
  it('test throttle', (done)=>{
    const spy = sinon.spy();
    const run = throttle(spy, 2);

    for(let i = 0; i < 2; i++ ) {
      setTimeout(()=>run(), i * 1);
    }

    setTimeout(()=>{
      expect(spy.callCount).to.equal(1);
      done();
    }, 100);
  });

  it('test throttle with last run', (done)=>{
    const spy = sinon.spy();
    const run = throttle(spy, 2, true);

    for(let i = 0; i < 2; i++ ) {
      setTimeout(()=>run(), i * 1);
    }

    setTimeout(()=>{
      expect(spy.callCount).to.equal(2);
      done();
    }, 100);
  });
});

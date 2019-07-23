import {win, doc} from '../index.js';
import {expect} from 'chai';
import jsdom from 'jsdom-global'; 

describe('Test doc in node', () => {
  let cleanup;

  before(() => {
    cleanup = jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanup());

  it('test doc', () => {
    const d = doc();
    expect(d.null).to.be.true;
  });
});

describe('Test win in node', () => {
  let cleanup;

  before(() => {
    cleanup = jsdom();
    document = undefined;
    window = undefined;
  });

  after(() => cleanup());
  it('test win', () => {
    const w = win();
    expect(w.null).to.be.true;
  });
});

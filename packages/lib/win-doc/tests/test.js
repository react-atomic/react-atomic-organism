import {win, doc} from '../cjs/src/index';
import {expect} from 'chai';

describe('Test doc', () => {
  it('test doc', () => {
    const d = doc();
    expect(d).to.equal(document);
  });
});

describe('Test win', () => {
  it('test win', () => {
    const w = win();
    expect(w).to.equal(window);
  });
});

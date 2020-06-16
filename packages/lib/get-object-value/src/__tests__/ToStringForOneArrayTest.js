import {expect} from 'chai';

import {toStringForOneArray} from '../index.js';


describe('Test toStringForOneArray', () => {
  it('basic test', ()=>{
    const a = ['foo'];
    expect(toStringForOneArray(a)).to.equal('foo');;
  });
});

import {expect} from 'chai';

import arraySearch from '../index';

describe('Test Array Search', () => {

  it('basic test', ()=>{
    const arr = [
      {},
      {a: ['xxx']},
      {
        a: 'foo',
      },
      {
        a: 'bar',
      }
    ];
    const acture = arraySearch(arr)('a', 'BAR');
    expect(acture).to.deep.equal([{a: 'bar'}]);
  });

  it('test without key', ()=>{
    const arr = ['FOO', 'BAR'];
    const acture = arraySearch(arr)(null, 'b');
    expect(acture).to.deep.equal(['BAR']);
  });

  it('test with exact', ()=>{
    const arr = ['a', 'aaa',  'aa']; 
    const acture1 = arraySearch(arr)(null, 'a');
    const acture2 = arraySearch(arr, true)(null, 'a');
    expect(acture1.length).to.equal(3);
    expect(acture2.length).to.equal(1);
  });
});


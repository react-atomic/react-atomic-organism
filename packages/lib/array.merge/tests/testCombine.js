import {expect} from 'chai';

import {combine, combineSub} from '../cjs/src/index.js';


describe('Test array combine', ()=>{
  it('test combine', ()=>{
    const arr = {
      foo: ['a', 'b', 'c'],
      bar: ['d', 'e', 'f']
    };
    const acture = combine(arr);
    const expected = [
      {foo: 'a', bar: 'd'},
      {foo: 'b', bar: 'e'},
      {foo: 'c', bar: 'f'},
    ];
    expect(acture).to.deep.equal(expected);
  });
});


describe('Test combine sub', ()=>{
  const subArr = {
    someSubKey: {
      foo: ['a'],
      bar: ['d']
    }
  };
  it('test combine sub', ()=>{
    const arr = [{somekey: 'someSubKey'}]; 
    const acture = combineSub(arr, subArr, 'somekey');
    const expected = [
      {somekey: [{foo:'a', bar: 'd'}]}
    ];
    expect(acture).to.deep.equal(expected);
  });
  it('test sub key not exists', ()=>{
    const arr = [{somekey: 'xxx'}]; 
    const acture = combineSub(arr, subArr, 'somekey');
    const expected = [
      {somekey: null}
    ];
    expect(acture).to.deep.equal(expected);
  });
});

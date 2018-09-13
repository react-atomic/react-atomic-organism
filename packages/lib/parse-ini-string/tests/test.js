import parse from '../cjs/src/index'; 
import {expect} from 'chai';

describe('Test parse ini', ()=>{
  const testData = `
foo=bar
abc=def
`
  it('Test simple', ()=>{
    const arr = parse(testData) 
    expect(arr).to.deep.equal({foo:'bar', abc:'def'})
  })
})

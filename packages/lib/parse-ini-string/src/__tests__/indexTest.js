import {expect} from 'chai';
import parse from '../index';

describe('Test parse ini', () => {
  const testData = `
foo=bar
abc=def
111="222"
aaa='bbb'
`;
  it('Test simple', () => {
    const arr = parse(testData);
    expect(arr).to.deep.equal({foo: 'bar', abc: 'def', '111': '222', aaa: 'bbb'});
  });

  it('Test null', () => {
    const text = `
      a=null
      b=Null
      c=NULL
      d='null'
      e="null"
    `;
    const expected = {a: null, b: null, c: null, d: 'null', e: 'null'};
    const arr = parse(text);
    expect(arr).to.deep.equal(expected);
  });

});

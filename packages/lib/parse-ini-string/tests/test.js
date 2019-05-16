import parse from '../cjs/src/index';
import {expect} from 'chai';

describe('Test parse ini', () => {
  const testData = `
foo=bar
abc=def
`;
  it('Test simple', () => {
    const arr = parse(testData);
    expect(arr).to.deep.equal({foo: 'bar', abc: 'def'});
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

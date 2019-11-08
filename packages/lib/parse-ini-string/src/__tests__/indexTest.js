import parse from '../index';
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

  it('Test multi line', () => {
    const uMultiLineText = `
a="000
111
"
b="111
222
333
";
`;
    const arr = parse(uMultiLineText);
    const expected = {a: '000\n111', b: '111\n222\n333'};
    expect(arr).to.deep.equal(expected);
  });
});

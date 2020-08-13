import {expect} from 'chai';
import parse from '../index';

describe('Test multi line', () => {

  it('Test multi line', () => {
    const uMultiLineText = `
a="000
111
"
b="111
"222"
333
";
`;
    const arr = parse(uMultiLineText);
    const expected = {a: '000\n111', b: '111\n"222"\n333'};
    expect(arr).to.deep.equal(expected);
  });
});

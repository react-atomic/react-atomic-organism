import {expect} from 'chai';

import get from '../cjs/src/index.js';

describe('Test Get Object Value', () => {
  it('test get', () => {
    const a = {
      foo: {
        bar: {
          key: 'v',
        },
      },
    };
    const acture = get(a, ['foo', 'bar', 'key']);
    expect(acture).to.equal('v');
  });
});

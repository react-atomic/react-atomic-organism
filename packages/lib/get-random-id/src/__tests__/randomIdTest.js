'use strict';

import randKey from '../index.js';
import {expect} from 'chai';

describe('Test rand key', () => {
  it('get key', () => {
    const keys = randKey().split('.');
    expect(isNaN(keys[0])).to.false;
    expect(isNaN(keys[1])).to.false;
  });
});

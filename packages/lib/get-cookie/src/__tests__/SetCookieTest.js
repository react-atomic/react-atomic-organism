import {expect} from 'chai';

import getCookie, {
  setCookie
} from '../index.js';

describe('test set cookie', ()=>{
  it('simple test', ()=>{
    setCookie('foo-set', 'bar-set');  
    expect(getCookie('foo-set')).to.equal('bar-set');
  });
});

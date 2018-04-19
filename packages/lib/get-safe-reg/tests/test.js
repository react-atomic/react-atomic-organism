'use strict';

import {expect} from 'chai';

import getSafeReg,{cacheReg} from '../src/index.js';

describe('test get safe reg', ()=>{
    let n;
    it('test get safe reg', ()=>{
        n = getSafeReg('/[|\\{}()[\]^$+*?.]/g'); 
        expect(n).to.equal('/\\[\\|\\\\\\{\\}\\(\\)\\[\\]\\^\\$\\+\\*\\?\\.\\]/g');
    });
    it('test reg is valid', ()=>{
        const patt = new RegExp(n);
        const res = patt.test('/[|\\{}()[\]^$+*?.]/g');
        expect(res).to.be.true;
    });
});


describe('test cache reg', ()=>{
    const cache = {};
    const getRegString = name => '(([#?&])'+getSafeReg(name)+'=)([^&#]*)';
    const getCache = name => cacheReg(cache)(getRegString)(name);
    it('get cache back', ()=>{
        const reg = getCache('foo');  
        const exec = reg.exec('?foo=bar');
        expect(exec[3]).to.equal('bar');
        expect(cache['foo']).to.not.be.null;
    });
});

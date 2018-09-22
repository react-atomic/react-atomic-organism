
import {expect} from 'chai';

import getCookie, {
    getCookieRegString,
    getCookieReg
} from '../cjs/src/index.js';

describe('test get cookie', ()=>{

    it('get cookie string', ()=>{
        const n = getCookieRegString('?');           
        expect(n).to.equal('\\?=([^;]+)');
    });

    it('get cookie reg', ()=>{
        const n = getCookieReg('?');           
        expect('?=xxx').to.match(n);
    });

    it('get cookie', ()=>{
        let cookie = 'csrftoken=Ly6OXDBtwNOVYa411Pb9zEVSjzp9HwN5Kcel7wUslGPXpGQKqSKOSVvzB7dUc6yy; sessionid=ufnhbb0vpybhu411ggye5wa96aeo77ll'; 
        const csrftoken = getCookie('csrftoken', cookie);
        const sessionid = getCookie('sessionid', cookie);
        expect(csrftoken).to.equal('Ly6OXDBtwNOVYa411Pb9zEVSjzp9HwN5Kcel7wUslGPXpGQKqSKOSVvzB7dUc6yy');
        expect(sessionid).to.equal('ufnhbb0vpybhu411ggye5wa96aeo77ll');
    });

    it('get not exists cookie', ()=>{
      const cookie = ' ';
      const result = getCookie('foo', cookie);
      expect(result).to.equal(null)
    });
});

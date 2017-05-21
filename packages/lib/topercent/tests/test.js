'use strict';

import toPercent, {percent, round} from '../src/index.js';
import {expect} from 'chai';

describe('Test percent', ()=>{
    const n = 1;
    it('To string', ()=>{
        expect(toPercent(n)).to.equal('100.00%');
    });
    it('To numeric', ()=>{
        expect(percent(n)).to.equal('100.00');
    });
    it('test round', ()=>{
        expect(round('2.225')).to.equal('2.23');
    });
});


'use strict';

import set from '../cjs/src/index.js';
import {expect} from 'chai';

describe('Test set', ()=>{
    it('check set result', ()=> {
        const obj={};
        set(obj, ['a', 'b'], 'c');
        expect(obj).to.deep.equal({a:{b:'c'}});
    });
});

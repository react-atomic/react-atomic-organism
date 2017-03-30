'use strict';

import set, {get} from '../src/index.js';
import {expect} from 'chai';

global.document = {};
describe('test get url', ()=>{
    let document = global.document;
    it('url', ()=>{
        document.URL='http://xxx?abc=def';
        expect(get('abc')).to.equal('def');
    });
});

describe('test set url', ()=>{
    let document = global.document;
    it('url', ()=>{
        document.URL='http://xxx?abc=def';
        expect(set('abc', 'foo')).to.equal('http://xxx?abc=foo');
    });
});

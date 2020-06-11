'use strict';

import set, {unsetUrl} from '../index.js';
import {expect} from 'chai';

global.document = {};

describe('test set url', ()=>{
    let document = global.document;
    it('url', ()=>{
        document.URL='http://xxx?abc=def';
        expect(set('abc', 'foo')).to.equal('http://xxx?abc=foo');
    });
});

describe('test clean url', ()=>{
    let document = global.document;
    it('with question mark', ()=>{
        document.URL='http://xxx?abc=def&foo=bar';
        expect(unsetUrl('abc')).to.equal('http://xxx?&foo=bar');
    });
    it('without question mark', ()=>{
        document.URL='http://xxx?abc=def&foo=bar';
        expect(unsetUrl('foo')).to.equal('http://xxx?abc=def');
    });
    it('key not exists', ()=>{
        document.URL='http://xxx?abc=def&foo=bar';
        expect(unsetUrl('bar')).to.equal('http://xxx?abc=def&foo=bar');
    });
});

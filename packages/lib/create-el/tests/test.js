import {js, css} from '../src/index'; 
import {expect} from 'chai';

describe('Test JS', ()=>{
    it('get JS', () => {
        const dNode = js(document.body)()('//cdn.jsdelivr.net/npm/reshow/build/cjs/src/dispatcher.js');
        expect(document.body.getElementsByTagName('script')[0].src).to.equal(dNode.src); 
    });
});

describe('Test CSS', ()=>{
    it('get CSS', () => {
        const dNode = css(document.body)()('//cdn.jsdelivr.net/npm/pure-css@1.0.4/lib/base.css');
        expect(document.body.getElementsByTagName('link')[0].href).to.equal(dNode.href); 
    });
});

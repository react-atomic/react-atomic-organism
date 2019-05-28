import {expect} from 'chai';

import merge from '../index.js';


describe('test array merge', ()=>{
    it('should return array, when only one is string', ()=>{
        const acture = merge('a');
        expect(acture).to.deep.equal(['a']);
    });
    it('should return same, when only one is array', ()=>{
        const acture = merge(['a']);
        expect(acture).to.deep.equal(['a']);
    });
    it('should return same, when pass null or undefined', ()=>{
        const acture = merge(['a'], null, undefined);
        expect(acture).to.deep.equal(['a']);
    });
    it('should return array, when merge two arrays', ()=>{
        const acture = merge(['a'], ['b']);
        expect(acture).to.deep.equal(['a', 'b']);
    });
    it('should return array, when merge string and array', ()=>{
        const acture = merge('a', ['b']);
        expect(acture).to.deep.equal(['a', 'b']);
    });
    it('should return array, when merge string and string', ()=>{
        const acture = merge('a', 'b');
        expect(acture).to.deep.equal(['a', 'b']);
    });
    it('should return array, when merge multi arrays', ()=>{
        const acture = merge(['a'], ['b'], ['c']);
        expect(acture).to.deep.equal(['a', 'b', 'c']);
    });
});

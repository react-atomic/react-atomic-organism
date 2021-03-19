import minMaxHelper from '..//index'; 
import {expect} from 'chai';

describe('test get Min and Max', ()=>{
    it('simple array', () => {
        const data = [1, 0];
        const oMinMax = new minMaxHelper();
        oMinMax.process()(data);
        expect(oMinMax.toArray()).to.deep.equal([0, 1]);
        expect(data).to.deep.equal([1, 0]);
    })

    it('complex array', () => {
        const data = [2, 1, 2, 3];
        const oMinMax = new minMaxHelper();
        oMinMax.process()(data);
        expect(oMinMax.toArray()).to.deep.equal([1, 3]);
    })

    it('same', () => {
        const data = [1];
        const oMinMax = new minMaxHelper();
        oMinMax.process()(data);
        expect(oMinMax.toArray()).to.deep.equal([1, 1]);
    })

    it('empty array', () => {
        const data = [] 
        const oMinMax = new minMaxHelper();
        oMinMax.process()(data);
        expect(oMinMax.toArray()).to.deep.equal([]);
    })

    it('with locator', ()=>{
        const data = [{value: 10}, {value: 20}, {value: 21}];
        const oMinMax = new minMaxHelper();
        oMinMax.process(d=>d.value)(data);
        expect(oMinMax.toArray()).to.deep.equal([10, 21]);
    });
});

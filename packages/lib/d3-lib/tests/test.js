'use strict';

import {
    line,
    pie,
    stack,
    hArea,
    colors,
    scaleBand,
    scaleLinear
} from '../src/index.js';

import {expect} from 'chai';
import get from 'get-object-value';

describe('basic', ()=>{
    it('colors', ()=>{
        expect(colors()(3)).to.equals(
            '#1f77b4'
        );
    });
});

describe('pie', ()=>{
    it('data', ()=>{
        let data = [ 
          {value:  50, "name": "Locke"},
          {value:  50, "name": "Reyes"},
        ];
        let result = pie(data, 10, 100); 
        expect(get(result, ['data', 0, 'value'])).to.equal(
            50
        );
    });
});

describe('stack', ()=>{
    it('data', ()=>{
        let data = [ 
          { apples: 3840, bananas: 1920, cherries: 960, dates: 400},
          { apples: 1600, bananas: 1440, cherries: 960, dates: 400},
        ];
        let result = stack(data);
        // console.log(result);
    });

    it('scaleBand', ()=>{
        let data = [ 
          { label: 'a'},
          { label: 'b'},
        ];
        const result = scaleBand(data, 0, 500);
        expect(result.length).to.be.above(243);
        expect(result.list).to.have.deep.property('a', { start: 0, value: 122 });
        expect(result.scaler).to.be.an('function');
    });

    it('scaleLinear', ()=>{
        let data = [ 
          { value: 11},
          { value: 22},
          { value: 33},
        ];
        let result = scaleLinear(data, 500, 0);
        //console.log(result);
    });
    it('invert', ()=>{
        const data = [ 
          { value: 10},
          { value: 22},
          { value: 33},
        ];
        const linear = scaleLinear(
            data, 500, 0, d => d.value
        );
        const scaler = linear.scaler;
        const number = scaler(10);
        expect(scaler.invert(number)).to.equal(10);
    });
});


describe('line', ()=>{
    const data = [ 
      { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }
    ];
    it('data', ()=>{
        let xLocator = (d)=>{
            return d.x;
        };
        let yLocator = (d)=>{
            return d.y;
        };
        let xScale = scaleBand(data, 0, 500, xLocator);
        let yScale = scaleLinear(data, 500, 0, yLocator);
        let result = line(data, xLocator, yLocator, xScale, yScale);
        expect(result).to.have.string('M');
    });
});


describe('area', ()=>{
    it('hArea', ()=>{
        let data = [
            {x:1, y0:3, y1:3},
            {x:4, y0:5, y1:6},
        ];
        let result = hArea(data);
        expect(result).to.have.string('M');
        expect(result).to.not.have.string('NaN');
    });
});

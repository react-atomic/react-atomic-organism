'use strict';

import {
    line,
    pie,
    stack,
    colors,
    scaleBand,
    scaleLinear
} from '../src/index.js';

import {expect} from 'chai';

global.document = {};
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
        expect(result).to.have.deep.property(
            'data.[0].value',
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
        let result = scaleBand(data, 0, 500);
        // console.log(result);
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
});


describe('line', ()=>{
    it('data', ()=>{
        let data = [ 
          { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }
        ];
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

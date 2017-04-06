'use strict';

import {
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
        let result = scaleLinear(data, 500, 0, 3);
        console.log(result);
    });
});

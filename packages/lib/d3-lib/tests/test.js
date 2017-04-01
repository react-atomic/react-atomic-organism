'use strict';

import lib, {pie, colors} from '../src/index.js';
import {expect} from 'chai';

global.document = {};
describe('basic', ()=>{
    it('pie', ()=>{
        let data = [ 
          {value:  50, "name": "Locke"},
          {value:  50, "name": "Reyes"},
        ];
        let result = pie(data); 
        console.log(result);
    });
    it('colors', ()=>{
       console.log(colors()(3)); 
    });
});


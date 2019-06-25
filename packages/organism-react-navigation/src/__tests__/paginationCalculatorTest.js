import {expect} from 'chai';

import paginationCalculator from '../paginationCalculator';


describe('Test Pagination Calculator', ()=>{ 
  it('basic test', ()=>{
    const pg = new paginationCalculator();
    pg.set('total', 500);
    let pgList = pg.genPageList(10);
    console.log({pgList});
    pg.set('total', 300);
    pgList = pg.genPageList(10);
    console.log({pgList});
  });
});

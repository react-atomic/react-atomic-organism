import React from 'react';
import {expect} from 'chai';
import {mount} from "reshow-unit";

import StockChart from "../StockChart";

describe('Test stock chart', ()=>{ 
  it("basic test", ()=>{
    const wrap = mount(<StockChart />);
    const html = wrap.html();
    expect(html).to.equal('');
  });
});

import React from 'react';
import {expect} from 'chai';
import {mount} from "reshow-unit";

import MultiChart from "../MultiChart";

describe('Test mulit chart', ()=>{ 
  it("basic test", ()=>{
    const wrap = mount(<MultiChart />);
    const html = wrap.html();
    expect(html).to.be.null;
  });
});

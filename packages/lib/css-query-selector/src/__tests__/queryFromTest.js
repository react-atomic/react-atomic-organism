'use strict';

import {expect} from 'chai';
import queryFrom from '../queryFrom'; 

describe('Test', ()=>{
  it('sample test', ()=>{
    const query = queryFrom(()=>document);
    const name = query.one('body').nodeName;
    expect(name).to.be.equal('BODY');
  });
});

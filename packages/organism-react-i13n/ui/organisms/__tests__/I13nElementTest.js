import React, {Component} from 'react';

import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import I13nElement from '../I13nElement';


describe('I13nElement test', ()=>{ 
  it('basic test', ()=>{
    const wrap = mount(<I13nElement />);
    expect(wrap.html()).to.have.string('div');
  });
});


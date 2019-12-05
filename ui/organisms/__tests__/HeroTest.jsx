import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Hero from '../Hero';

describe('Test Hero Component', ()=>{ 
  it('basic test', ()=>{
    const comp = <Hero />
    const uDom = mount(comp);
    const html = uDom.html(); 
    expect(html).to.have.string('div');
  });
});

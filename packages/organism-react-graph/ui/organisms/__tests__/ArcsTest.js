import React, {Component} from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Arcs from '../Arcs';

describe('Test Arc Component', ()=>{ 
  it('base test', ()=>{
    let objLine;
    const comp = (
      <svg>
      <Arcs
        startAngle={0}
        endAngle={Math.PI}
      />
      </svg>
    ); 
    const uDom = mount(comp);
    const html = uDom.html(); 
    expect(html).to.equal('<svg><g class="arcs"><g class="arc"><path d="M3.061616997868383e-15,-50A50,50,0,1,1,3.061616997868383e-15,50L0,0Z"></path></g></g></svg>');
  });
});

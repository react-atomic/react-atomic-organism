import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Suggestion from '../Suggestion';

describe('Test Suggestion Component', ()=>{ 
  it('basic test', ()=>{
    const comp = <Suggestion />
    const uDom = mount(comp);
    const html = uDom.html(); 
    expect(html).to.have.string('div');
  });
});

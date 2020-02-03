import React from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import UMLGraph from '../UMLGraph';

describe('Test UMLGraph', ()=>{ 
  it('simple test', ()=>{
    const vDom = (
      <UMLGraph />
    );
    const wrap = mount(vDom);
    const actual = wrap.html();
    expect(actual).to.have.string('d3-uml');
  });
});

import jsdom from 'jsdom-global'
import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Breadcrumb from '../Breadcrumb';

describe('Test Breadcrumb', ()=>{ 
  it('simple test', ()=>{
    const wrap  = mount(<Breadcrumb />);
    const html = wrap.html();
    expect(html).to.have.string('breadcrumb');
  });
});

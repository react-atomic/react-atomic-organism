import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import PaginationController from '../PaginationController';

describe('Test Breadcrumb', ()=>{ 
  it('simple test', ()=>{
    const wrap  = mount(<PaginationController />);
    const html = wrap.html();
    expect(html).to.have.string('pagination');
  });
  it('test hide only one', ()=>{
    const wrap  = mount(<PaginationController hideOnlyOne />);
    const html = wrap.html();
    expect(html).to.be.null;
  });
  it('test have two pages with hideOnlyOne', ()=>{
    const wrap  = mount(<PaginationController hideOnlyOne total={20}/>);
    const html = wrap.html();
    expect(html).to.have.string('11-20');
  });
});

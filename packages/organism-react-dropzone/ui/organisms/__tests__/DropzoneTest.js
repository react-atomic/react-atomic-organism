import jsdom from 'jsdom-global'
import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Dropzone from '../Dropzone';


describe('Test Dropzone', ()=>{ 
  it('simple test', ()=>{
    const wrap  = mount(<Dropzone postUrl="http://xxx" />);
    const html = wrap.html();
    expect(html).to.have.string('class="dropzone ui"');
  });
});

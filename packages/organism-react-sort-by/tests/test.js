import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import SortBy from './../cjs/src/index'

describe('Test SortBy', ()=>{ 
   class FakeComponent extends PureComponent 
   {
        render()
        {
            return <SortBy /> 
        }
    }

    it('test mount', ()=>{
       const vDom = <FakeComponent />;
       const uHtml  = mount(vDom).html();
       expect(uHtml).to.have.string('<a href="#">');
    })
})

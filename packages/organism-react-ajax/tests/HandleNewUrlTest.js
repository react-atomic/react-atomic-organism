import jsdom from 'jsdom-global'
import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {
    AjaxPage,
    ajaxDispatch
} from './../cjs/src/index'

describe('Test Handle New Url', ()=>{ 
   let uGlobal
   let global 
   before( () => uGlobal = jsdom(null, {url: 'http://localhost'}))
   after( () => uGlobal() )
   class FakeComponent extends PureComponent 
   {
        render()
        {
            return <AjaxPage
                ref={el => this.page = el}
                win={window}
                updateWithUrl={this.props.updateWithUrl}
                themes={{fake: <div />}}
                themePath="fake"
            />
        }
    }

    it('test history back', (done)=>{
       const myUpdate = () => {
            expect(true).to.be.true
            done()
       };
       const vDom = <FakeComponent updateWithUrl={myUpdate} />;
       const uFake  = mount(vDom).instance();
       window.history.pushState(null, "title", "http://localhost/bbb");
       window.history.pushState(null, "title", "http://localhost/ccc");
       window.history.back();
    })
})

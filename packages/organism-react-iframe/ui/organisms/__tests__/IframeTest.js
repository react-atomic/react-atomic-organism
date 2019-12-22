import React, {Component} from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Iframe from '../Iframe';

describe('Test Iframe', ()=>{ 
  it('simple test', done=>{
    class Comp extends Component {
      render()
      {
        return <Iframe ref={el=>this.el=el}><span>test</span></Iframe>;
      }
    }
    const el = document.createElement('div');
    document.body.appendChild(el);
    const uDom = mount(<Comp />, { attachTo: el });
    const wrap = uDom.instance();
    setTimeout(()=> {
      const html = wrap.el.getBody().innerHTML;
      expect(html).to.have.string('<span>test</span>');
      done();
    }, 100);
  });
});

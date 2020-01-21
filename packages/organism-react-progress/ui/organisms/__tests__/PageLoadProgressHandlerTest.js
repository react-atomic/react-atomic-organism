import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {PopupPool} from 'organism-react-popup';
import PageLoadProgressHandler from '../PageLoadProgressHandler';

describe('Test PageLoadProgressHandler', ()=>{ 
  it('basic test', done =>{
    const VDom = props => {
      const [dom, setDom] = useState();
      useEffect(()=>{
        setDom(<PageLoadProgressHandler />);
      });
      return (
      <div>
        {dom}
        <PopupPool />
      </div>
      );
    }; 
    const wrap = mount(<VDom />);
    setTimeout(()=>{
      const actual = wrap.html();
      expect(actual).to.have.string('processBar');
      done();
    }, 10);
  }); 
});

import React, {PureComponent} from 'react'
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Select from '../Select';

describe('Test Select', ()=>{ 
  it('should reset value by assign empty string', ()=>{
    class TestComp extends PureComponent {
      state = {v: null};
      setv = v => this.setState({v});
      render() {
        const {v} = this.state;
        return <Select ref={el=>this.el = el} value={v} />
      }
    }
    const wrap  = mount(<TestComp />);
    const instance = wrap.instance();
    instance.el.handleSelect({
      label: 'mylabel',
      value: 'myvalue'
    })();
    expect(instance.el.state).to.deep.equal({ value: 'myvalue' });
    instance.setv('');
    expect(instance.el.state).to.deep.equal({ 
      value: '',
      prevValue: ''
    });
  });
});

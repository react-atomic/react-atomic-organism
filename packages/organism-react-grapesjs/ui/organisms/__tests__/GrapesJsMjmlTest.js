import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import GrapesJsMjml from '../GrapesJsMjml';

describe('Test GrapesJsMjml Component', () => {
  it('simple test', () => {
    const fakeHost = {
      execUpdateImages: ()=>{}
    };
    const wrapper = shallow(<GrapesJsMjml host={fakeHost}/>);
    expect(wrapper.html()).to.have.string('iframe');
    wrapper.unmount();
  });
});

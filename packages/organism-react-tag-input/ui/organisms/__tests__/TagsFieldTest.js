import React from 'react';
import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import TagsField from '../TagsField';

describe('Test Tags field', () => {
  it('simple test', () => {
    const vdom = <TagsField />;
    const wrapper = mount(vdom);
    expect(wrapper.html()).to.have.string('<div');
  });
});

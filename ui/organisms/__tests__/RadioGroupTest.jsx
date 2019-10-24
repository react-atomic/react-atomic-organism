import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RadioGroup from '../RadioGroup';

describe('Test Radio Group Component', () => {
  it('test simple', () => {
    const wrapper = mount(
      <RadioGroup options={[]} name=''/>,
    );
    expect(wrapper.html()).to.have.string('div');
  });

  it('test pass empty', () => {
    const options = [
      {label: 'a', value: ''}
    ];
    const wrapper = mount(
      <RadioGroup options={options} value='' name='' />
    );
    const instance = wrapper.instance();
    expect(instance.getValue()).to.equal('');
  });

  it('test getValue not found', () => {
    const options = [
      {label: 'a', value: ''}
    ];
    const wrapper = mount(
      <RadioGroup options={options} value={null} name='' />
    );
    const instance = wrapper.instance();
    expect(instance.getValue()).to.be.undefined;
  });
});

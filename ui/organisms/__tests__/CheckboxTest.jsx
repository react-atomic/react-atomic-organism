import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Checkbox from '../Checkbox';

describe('Test Checkbox Component', () => {
  it('test disabled', done => {
    const uTestClick = (e, before, after) => {
      expect(before).to.equal(after);
      done();
    };
    const wrapper = mount(
      <Checkbox checked disabled afterClick={uTestClick} />,
    );
    wrapper.find('input').simulate('click');
  });

  it('test without disabled', done => {
    const uTestClick = (e, before, after) => {
      expect(before).not.equal(after);
      done();
    };
    const wrapper = mount(<Checkbox afterClick={uTestClick} />);
    wrapper.find('input').simulate('click');
  });
});

import React from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import OnEnterInput from '../OnEnterInput';

describe('OnEnterInput test', () => {
  it('simple test', done => {
    const uTestOnEnter = (e) => {
      expect(e.keyCode).to.equal(13);
      done();
    };
    const wrapper = mount(
      <OnEnterInput onEnter={uTestOnEnter} />,
    );
    wrapper.find('input').simulate('keyDown', {keyCode: 13});
  });
});

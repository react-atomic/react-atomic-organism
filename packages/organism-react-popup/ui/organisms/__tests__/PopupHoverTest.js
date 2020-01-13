import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import PopupHover from '../PopupHover';

describe('Test PopupHover', () => {
  it('basic test', () => {
    const wrap = mount(<PopupHover />);
    const actual = wrap.html(); 
    expect(actual).to.have.string('name="popup-hover"');
  });
});

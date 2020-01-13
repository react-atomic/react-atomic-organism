import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import PopupClick from '../PopupClick';

describe('Test PopupClick', () => {
  it('basic test', () => {
    const wrap = mount(<PopupClick />);
    const actual = wrap.html(); 
    expect(actual).to.have.string('popup-click');
  });
});

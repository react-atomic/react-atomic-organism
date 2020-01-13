import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import PopupMonitor from '../PopupMonitor';

describe('Test PopupMonitor', () => {
  it('basic test', () => {
    const wrap = mount(<PopupMonitor><div /></PopupMonitor>);
    const actual = wrap.html(); 
    expect(actual).to.have.string('popup-monitor');
  });
});

import React, {Component} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import AlertsNotifier from '../AlertsNotifier';

describe('Test AlertsNotifier', () => {
  it('simple test', () => {
    const vDom = <AlertsNotifier />;
    const oDom = mount(vDom);
    const actual = oDom.html();
    expect(actual).to.have.string('div');
  });
});

import React from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import AjaxForm from '../AjaxForm';

describe('AjaxForm Test', () => {
  it('basic test', () => {
    const vDom = <AjaxForm />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string('form');
  });
});

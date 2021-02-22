import React from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Step from '../Step';

describe('Step Test', () => {
  it('basic test', () => {
    const vDom = <Step />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.be.null;
  });
});

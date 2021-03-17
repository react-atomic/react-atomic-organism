import React from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import CodeExample from '../CodeExample';

describe('CodeExample Test', () => {
  it('basic test', () => {
    const vDom = <CodeExample />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string('div');
  });
});

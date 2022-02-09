import React from 'react';
import {expect} from 'chai';
import {mount} from "reshow-unit";

import SortBy from '../SortBy';

describe('SortBy Test', () => {
  it('basic test', () => {
    const vDom = <SortBy />;
    const wrap = mount(vDom);
    const html = wrap.html();
    expect(html).to.have.string('<a data-sort="" href="#">');
  });
});

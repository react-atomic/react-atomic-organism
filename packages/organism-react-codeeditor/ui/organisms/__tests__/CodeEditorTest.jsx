import React, {Component} from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import {openCodeEditor} from '../CodeEditor';
import {PopupPool} from 'organism-react-popup';

describe('Test CodeEditor', () => {
  it('simple test', done => {
    const dom = <PopupPool />;
    const uDom = mount(dom);
    openCodeEditor();
    setTimeout(() => {
      uDom.update();
      const html = uDom.html();
      expect(html).to.have.string('full-screen');
      done();
    });
  });
});

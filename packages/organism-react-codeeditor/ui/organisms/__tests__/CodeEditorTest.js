import React, {Component} from 'react';
import jsdom from 'jsdom-global';
let reset = jsdom(null);

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import {openCodeEditor} from '../CodeEditor';
import {PopupPool, popupDispatch} from 'organism-react-popup';

describe('Test CodeEditor', () => {
  after(() => {
    jsdom();
  });

  afterEach(done => {
    reset();
    reset = jsdom(null);
    popupDispatch('dom/cleanAll');
    setTimeout(() => done(), 300);
  });

  it('simple test', done => {
    const dom = <PopupPool />;
    const uDom = mount(dom);
    openCodeEditor();
    setTimeout(() => {
      uDom.update();
      const html = uDom.html();
      expect(html).to.have.string('full-screen');
      done();
    }, 100);
  });

  it('test set html', done => {
    const dom = <PopupPool />;
    const wrapper = mount(dom);
    openCodeEditor('<div />', html => {
      expect(html).to.equal('');
      done();
    });
    wrapper.update();
    setTimeout(() => {
      wrapper.update();
      const iframe = wrapper.find('iframe.codemirror');
      popupDispatch('dom/closeAll');
    }, 1000);
  });
});

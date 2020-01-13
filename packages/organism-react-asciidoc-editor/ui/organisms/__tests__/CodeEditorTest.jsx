import React, {Component} from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import {openCodeEditor} from '../CodeEditor';
import {PopupPool, popupDispatch} from 'organism-react-popup';

describe('Test CodeEditor', () => {

  afterEach(done => {
      popupDispatch('dom/cleanAll');
      setTimeout(()=>done(), 300);
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
    });
  });
  it('test set html', done => {
    const dom = <PopupPool />;
    const uDom = mount(dom);
    openCodeEditor('<div>', (html)=>{
        expect(html).to.have.string('html');
        done();
    });
    setTimeout(() => {
      popupDispatch('dom/closeAll');
    });
  });
});

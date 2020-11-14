import React, {Component} from 'react';
import gJsdom from 'jsdom-global';
import {ResourceLoader} from 'jsdom';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Iframe from '../Iframe';

describe('Test Iframe', () => {
  let reset;
  beforeEach(() => {
    const resourceLoader = new ResourceLoader({});
    resourceLoader.fetch = (url, options) =>  Promise.resolve(Buffer.from('window.dlog = "fake-dlog";'))
    reset = gJsdom('', {
      runScripts: 'dangerously',
      resources: resourceLoader
    });
  });

  afterEach(() => {
    reset();
  });

  it('simple test', done => {
    class Comp extends Component {
      render() {
        return (
          <Iframe ref={el => (this.el = el)}>
            <span>test</span>
          </Iframe>
        );
      }
    }
    const el = document.createElement('div');
    document.body.appendChild(el);
    const wrap = mount(<Comp />, {attachTo: el});
    setTimeout(() => {
      const obj = wrap.instance();
      const html = obj.el.getBody().innerHTML;
      expect(html).to.have.string('<span>test</span>');
      done();
    }, 100);
  });

  it('test with script', done => {
    class Comp extends Component {
      render() {
        return (
          <Iframe ref={el => (this.el = el)}>
            <script src="https://cdn.jsdelivr.net/npm/organism-react-ajax@0.6.13/build/dlog.min.js"></script>
          </Iframe>
        );
      }
    }
    const el = document.createElement('div');
    document.body.appendChild(el);
    const uDom = mount(<Comp />, {attachTo: el});
    const wrap = uDom.instance();
    setTimeout(() => {
      const dlog = wrap.el.getWindow().dlog;
      expect(dlog).to.equal('fake-dlog');
      done();
    }, 300);
  });
});

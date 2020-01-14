import {js, css, create, inject, remove} from '../index'; 
import {expect} from 'chai';


describe('Test create', ()=>{
  it('create empty div', () => {
    const div = create('div')()()
    expect(typeof div).to.equal('object')
  })
});

describe('Test remove', ()=>{
  let dom;
  it('add a dom', ()=>{
    dom = create('div')()({
      id: 'test-remove-dom',
      innerHTML: 'hello'
    });
    inject()(dom);
    const html = document.documentElement.innerHTML;
    expect(html).to.have.string('test-remove-dom');
  });

  it('test remove dom', ()=>{
    let html = document.documentElement.innerHTML;
    expect(html).to.have.string('test-remove-dom');
    remove(dom); 
    html = document.documentElement.innerHTML;
    expect(html).to.not.have.string('test-remove-dom');
  });
});

describe('Test JS', ()=>{
    it('get JS', () => {
        const dNode = js(document.body)()('//cdn.jsdelivr.net/npm/reshow/build/cjs/src/dispatcher.js');
        expect(document.body.getElementsByTagName('script')[0].src).to.equal(dNode.src); 
    });
});

describe('Test CSS', ()=>{
    it('get CSS', () => {
        const dNode = css(document.body)()('//cdn.jsdelivr.net/npm/pure-css@1.0.4/lib/base.css');
        expect(document.body.getElementsByTagName('link')[0].href).to.equal(dNode.href); 
    });
});

import {expect} from 'chai';
import {defaultQuery as query} from '../queryFrom'; 

describe('Test query ancestor', ()=>{
  after(()=>document.body.innerHTML = '');
  it('test closest and polyfill', ()=>{
    document.body.innerHTML = `
<main id="root"><div id="foo"><span id="bar"></span></div></main>
`;
    const el = query.one('#bar'); 
    const foo = query.ancestor(el, '#foo');
    el.closest = undefined;
    const foo1 = query.ancestor(el, '#foo');
    expect(foo.isSameNode(foo1)).to.be.true;
  });
});

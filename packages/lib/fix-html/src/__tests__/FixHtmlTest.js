import {expect} from 'chai';

import fixHtml from '../index';

describe('Test fixHtml', ()=>{ 
  it('simple test', ()=>{
    const a = fixHtml();
    expect(a).to.equal('<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body></body></html>');
  });

  it('fix un-close tag', ()=>{
    const input = '<a a=" b="c">"=""</a><span a=" b="c">foo';
    const a = fixHtml(input);
    expect(a).to.equal('<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><a a=" b=" c>"=""</a><span a=" b=" c>foo</span></body></html>');
  });
});

import {expect} from 'chai';
import gJsdom from 'jsdom-global';

import exec from '../cjs/src/index.js';

describe('Exec Script', () => {
  let jsdom;
  before(() => {
    jsdom = gJsdom('', {runScripts: 'outside-only'});
  });

  it('simple', () => {
    exec('<script>window.a = 1</script>');
    expect(window.a).to.equal(1);
  });

  it('syntax error', done => {
    exec('<script>window.a = (</script>', null, null, (err, js)=>{
      expect(err.message).to.have.string('Unexpected token');
      done();
    });
  });

  after(() => {
    jsdom();
  });
});

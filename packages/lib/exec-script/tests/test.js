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

  it('syntax error with callback', done => {
    exec('<script>window.a = (</script>', null, null, (err, js)=>{
      expect(err.message).to.have.string('Unexpected token');
      done();
    });
  });

  it('syntax error without callback', () => {
    var test = () => exec('<script>window.a = (</script>');
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
    expect(test).to.throw('Unexpected token }');
  });

  after(() => {
    jsdom();
  });
});

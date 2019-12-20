import {expect} from 'chai';
import gJsdom from 'jsdom-global';

import exec from '../index.js';
import callfunc from 'call-func';

describe('Exec Script', () => {
  let jsdom;
  beforeEach(() => {
    jsdom = gJsdom('', {runScripts: 'dangerously'});
  });

  afterEach(() => {
    jsdom();
  });

  it('simple', () => {
    exec('<script>window.a = 1</script>');
    expect(window.a).to.equal(1);
  });

  it('syntax error with callback', done => {
    exec('<script>window.a = (</script>', null, null, (err, js) => {
      expect(err.message).to.have.string('Unexpected token');
      done();
    });
  });

  it('syntax error without callback', () => {
    var test = () => exec('<script>window.a = (</script>');
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
    expect(test).to.throw('Unexpected token }');
  });

  it('test order', done => {
    const html = `
      <script>window.a = 111;</script>
      <script src="//xxx/1.js"></script> 
      <script>window.a = 333;</script>
      <script src="//xxx/2.js"></script> 
      <script>window.a = '';</script>
    `;
    const expected = [
      {a: 111, src: undefined},
      {a: 333, src: '//xxx/1.js'},
      {a: '', src: '//xxx/2.js'},
    ];
    exec(
      html,
      window,
      null,
      null,
      ({key, origScript, queueScripts}) => {
        expect({a: window.a, src: (origScript || {}).src}).to.deep.equal(
          expected.shift(),
        );
        if (!queueScripts.length) {
          done();
        }
      },
      ({loadScript}) => loadScript.onreadystatechange(),
    );
  });

  it('test async', done => {
    const html = `
      <script>window.a = 111;</script>
      <script async src="//xxx/1.js"></script> 
      <script>window.a = 333;</script>
      <script async src="//xxx/2.js"></script> 
    `;
    const expected = ['//xxx/1.js', '//xxx/2.js'];
    exec(
      html,
      window,
      null,
      null,
      ({key, origScript, queueScripts}) => {
        expect(window.a).to.equal(333);
        if (!queueScripts.length) {
          done();
        }
      },
      ({origScript}) => {
        expect(origScript.src).to.equal(expected.shift());
      },
    );
  });

  it('test defer', done => {
    const html = `
      <script>window.a = 111;</script>
      <script defer src="//xxx/1.js"></script> 
      <script async src="//xxx/2.js"></script> 
      <script>window.a = 222;</script>
      <script src="//xxx/3.js"></script> 
      <script>window.a = 333;</script>
    `;
    const expected = ['//xxx/2.js', '//xxx/3.js', '//xxx/1.js'];
    const expectedA = [222, 333];
    exec(
      html,
      window,
      null,
      null,
      ({key, origScript, queueScripts}) => {
        expect(window.a).to.equal(expectedA.shift());
        if (!queueScripts.length) {
          done();
        }
      },
      ({origScript, loadScript}) => {
        callfunc(loadScript.onreadystatechange);
        expect(origScript.src).to.equal(expected.shift());
      },
    );
  });
});

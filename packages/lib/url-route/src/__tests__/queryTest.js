import {expect} from 'chai';
import sinon from 'sinon';
import Router from '../index';

describe('Test Router with Query', () => {
  it('Test query', () => {
    const cb = sinon.spy(() => {});
    const router = new Router();
    router.addRoute('http://abc/?a=??&b=foo', cb);
    const match = router.match('https://abc/?a=12&b=foo');
    expect(null != match).to.be.true;
  });
});

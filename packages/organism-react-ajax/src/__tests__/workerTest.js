import {expect} from 'chai';
import sinon from 'sinon';
import req from 'superagent';
const sandbox = sinon.createSandbox();

import worker from '../worker';

describe('Worker  Test', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('test pass method', () => {
    sandbox.spy(req, 'put');
    worker.postMessage({
      type: 'ajaxPost',
      url: 'http://localhost',
      action: {
        params: {
          method: 'put',
        },
      },
    });
    expect(req.put.callCount).to.equal(1);
  });
});

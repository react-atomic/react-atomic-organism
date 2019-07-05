import {expect} from 'chai';
import jsdom from 'jsdom-global';

import formSerialize from '../formSerialize';

describe('Test formSerialize', () => {
  let uGlobal;
  beforeEach(() => (uGlobal = jsdom()));
  afterEach(() => uGlobal());
  it('simple test', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="text" name="foo" value="bar">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: 'bar'});
  });
});

describe('Test formSerialize arrayMode', () => {
  let uGlobal;
  beforeEach(() => (uGlobal = jsdom()));
  afterEach(() => uGlobal());

  it('auto', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo" value="bar1">
        <input type="checkbox" checked name="foo" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: ['bar1', 'bar2']});
  });

  it('[] in auto mode with two items', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
        <input type="checkbox" checked name="foo[]" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({'foo[]': ['bar1', 'bar2']});
  });

  it('[] in auto mode with one items', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({'foo[]': 'bar1'});
  });

  it('arrayKey with one item', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, 'arrayKey')).to.deep.equal({foo: ['bar1']});
  });

  it('arrayKey with two items', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
        <input type="checkbox" checked name="foo[]" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, 'arrayKey')).to.deep.equal({
      foo: ['bar1', 'bar2'],
    });
  });

  it('arrayKeyKeep with two items', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
        <input type="checkbox" checked name="foo[]" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, 'arrayKeyKeep')).to.deep.equal({
      'foo[]': ['bar1', 'bar2'],
    });
  });

  it('none array mode', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo[]" value="bar1">
        <input type="checkbox" checked name="foo[]" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, false)).to.deep.equal({'foo[]': 'bar2'});
  });

  it('input with same key', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="text" checked name="foo" value="bar1">
        <input type="text" checked name="foo" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: ['bar1', 'bar2']});
  });

  it('input with []', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="text" checked name="foo[]" value="bar1">
        <input type="text" checked name="foo[]" value="bar2">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({'foo[]': ['bar1', 'bar2']});
  });
});

describe('Test formSerialize with multi select', () => {
  let uGlobal;
  beforeEach(() => (uGlobal = jsdom()));
  afterEach(() => uGlobal());
  it('with simple', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
      <select name="foo" multiple>
        <option selected value="bar1">foo-bar1</option>
        <option selected value="bar2">foo-bar2</option>
        <option value="bar3">foo-bar3</option>
      </select>
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: ['bar1', 'bar2']});
  });

  it('text only', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
      <select name="foo" multiple>
        <option selected>bar1</option>
        <option selected>bar2</option>
        <option>bar3</option>
      </select>
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: ['bar1', 'bar2']});
  });

  it('one item with arrayKey', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
      <select name="foo" multiple>
        <option selected>bar1</option>
      </select>
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({foo: 'bar1'});
  });

  it('one item', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
      <select name="foo[]" multiple>
        <option selected>bar1</option>
      </select>
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, 'arrayKey')).to.deep.equal({foo: ['bar1']});
  });

  it('arrayKeyKeep', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
      <select name="foo[]" multiple>
        <option selected>bar1</option>
      </select>
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm, 'arrayKeyKeep')).to.deep.equal({
      'foo[]': ['bar1'],
    });
  });
});

describe('Test formSerialize with checkbox', () => {
  let uGlobal;
  beforeEach(() => (uGlobal = jsdom()));
  afterEach(() => uGlobal());
  it('data-checked-to-value', () => {
    const body = document.body;
    body.innerHTML = `
      <form>
        <input type="checkbox" checked name="foo" value="">
        <input type="checkbox" checked name="foo1" >
        <input type="checkbox" checked name="foo2" value="1">
        <input type="checkbox" checked name="foo3" data-boolean="true">
        <input type="checkbox" checked name="foo4" data-boolean="true" value="1">
        <input type="checkbox" checked name="foo5" data-boolean="true" value="true">
        <input type="checkbox" checked name="foo6" data-boolean="true" value="false">
        <input type="checkbox" checked name="foo7" data-boolean="true" value="null">
        <input type="checkbox" checked name="foo8" data-boolean="true" value="0">
      </form>
    `;
    const fm = document.getElementsByTagName('form')[0];
    expect(formSerialize(fm)).to.deep.equal({
      foo: '',
      foo1: 'on',
      foo2: '1',
      foo3: true,
      foo4: true,
      foo5: true,
      foo6: false,
      foo7: false,
      foo8: false,
    });
  });
});

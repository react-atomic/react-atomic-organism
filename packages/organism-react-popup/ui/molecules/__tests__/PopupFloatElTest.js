import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import PopupFloatEl from '../PopupFloatEl';
import DisplayPopupEl from '../../organisms/DisplayPopupEl';
import PopupPool from '../../organisms/PopupPool';

describe('Test PopupFloatEl', () => {
  it('basic test', done => {
    const VDom = props => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(
          <DisplayPopupEl>
            <PopupFloatEl id="my-float" />
          </DisplayPopupEl>,
        );
      });
      return (
        <div>
          {dom}
          <PopupPool />
        </div>
      );
    };
    const oDom = mount(<VDom />);
    setTimeout(() => {
      const actual = oDom.html();
      expect(actual).to.have.string('id="my-float"');
      done();
    },300);
  });
});

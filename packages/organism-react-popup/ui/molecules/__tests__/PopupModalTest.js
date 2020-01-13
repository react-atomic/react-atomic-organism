import React, {useState, useEffect} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import PopupModal from '../PopupModal';
import DisplayPopupEl from '../../organisms/DisplayPopupEl';
import PopupPool from '../../organisms/PopupPool';

describe('Test PopupModal', () => {
  it('basic test', done => {
    const VDom = props => {
      const [dom, setDom] = useState();
      useEffect(() => {
        setDom(
          <DisplayPopupEl>
            <PopupModal id="my-id" />
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
      expect(actual).to.have.string('id="my-id"');
      done();
    });
  });
});

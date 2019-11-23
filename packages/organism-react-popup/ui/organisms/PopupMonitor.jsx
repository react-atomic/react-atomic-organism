import React, {PureComponent} from 'react';

import {popupDispatch} from '../../src/index';

class PopupMonitor extends PureComponent {
  static getPopupKey(props) {
    console.error('Not override getPopupKey');
  }

  static getPopupElement(key) {
    console.error('Not override getPopupElement');
  }

  static calculateState(prevState, props) {
    const key = this.popupKey || this.getPopupKey(props);
    if (key) {
      const popupElement = this.getPopupElement(key);
      popupDispatch({
        type: 'dom/update',
        params: {
          popup: popupElement,
        },
      });
    } else {
      popupDispatch({
        type: 'dom/closeAll',
      });
    }
    return prevState;
  }
}

export default PopupMonitor;

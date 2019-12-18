import React, {PureComponent} from 'react';
import {popupDispatch} from '../../src/index';

const isArray = Array.isArray;

class DisplayPopupEl extends PureComponent {
  _mount = false;

  getChildren() {
    return this.props.children;
  }

  setFloat() {
    setTimeout(() => {
      if (this._mount) {
        popupDispatch({
          type: 'dom/update',
          params: {
            popup: this.getChildren(),
          },
        });
      }
    });
  }

  componentDidMount() {
    this._mount = true;
    this.setFloat();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setFloat();
  }

  componentWillUnmount() {
    this._mount = false;
    popupDispatch({
      type: 'dom/cleanOne',
      params: {
        popup: this.getChildren(),
      },
    });
  }

  render() {
    return null;
  }
}

export default DisplayPopupEl;

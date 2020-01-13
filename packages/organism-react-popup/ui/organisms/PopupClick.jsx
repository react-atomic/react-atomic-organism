import React, {Component} from 'react';

import {build, mixClass, SemanticUI} from 'react-atomic-molecule';

import PopupOverlay from '../molecules/PopupOverlay';
import {popupDispatch} from '../../src/popupDispatcher';


class PopupClick extends Component {
  handleClick = () => {
    const {popup: propsPopup, callback} = this.props;
    let popup;
    if (React.isValidElement(propsPopup)) {
      popup = propsPopup;
    } else if (typeof propsPopup === 'function') {
      popup = propsPopup();
    } else {
      popup = <PopupOverlay>{propsPopup}</PopupOverlay>;
    }

    popupDispatch({
      type: 'dom/update',
      params: {
        popup: popup,
      },
    });
    if (typeof callback === 'function') {
      callback(popup);
    }
  };

  render() {
    let {style, className, container, popup, callback, ...reset} = this.props;
    if (!React.isValidElement(container)) {
      container = <SemanticUI />;
    }
    style = {...style, ...Styles.container};
    className = mixClass(className, 'popup-click');
    const props = {
      ...reset,
      onClick: this.handleClick,
      className,
      style,
    };
    return build(container)(props);
  }
}

export default PopupClick;

const Styles = {
  container: {
    cursor: 'pointer',
  },
};

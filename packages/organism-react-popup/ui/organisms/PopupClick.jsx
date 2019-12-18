import React, {Component} from 'react';

import {build, SemanticUI} from 'react-atomic-molecule';

import {popupDispatch, PopupOverlay} from '../../src/index';

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
    let {style, container, popup, callback, ...reset} = this.props;
    if (!React.isValidElement(container)) {
      container = <SemanticUI />;
    }
    style = {...style, ...Styles.container};
    const props = {
      ...reset,
      onClick: this.handleClick,
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

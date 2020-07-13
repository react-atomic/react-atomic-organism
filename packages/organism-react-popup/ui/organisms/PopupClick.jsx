import React, { Component } from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import { getTimestamp } from "get-random-id";
import callfunc from "call-func";

import PopupOverlay from "../molecules/PopupOverlay";
import DisplayPopupEl from "../organisms/DisplayPopupEl";

class PopupClick extends Component {
  handleClick = () => this.open();

  open() {
    const { callback } = this.props;
    this.setState({ show: true, bust: getTimestamp() }, () => {
      callfunc(callback);
    });
  }

  close() {
    const { onClose } = this.props;
    this.setState({ show: false }, () => {
      callfunc(onClose);
    });
  }

  render() {
    const {
      children,
      style,
      className,
      component,
      container, // Retire, will not use.
      popup,
      callback,
      onClose,
      ...reset
    } = this.props;
    const { show, bust } = this.state || {};
    const thisStyle = { ...style, ...Styles.container };
    let popupEl = null;
    if (show) {
      popupEl = (
        <DisplayPopupEl bust={bust} key="popup-el">
          {build(popup, { wrap: PopupOverlay, doCallFunction: true })()}
        </DisplayPopupEl>
      );
    }
    const thisChildren = [...(children || []), popupEl];
    const props = {
      ...reset,
      onClick: this.handleClick,
      className: mixClass(className, "popup-click"),
      style: thisStyle
    };
    return build(component || container || SemanticUI)(props, thisChildren);
  }
}

export default PopupClick;

const Styles = {
  container: {
    cursor: "pointer"
  }
};

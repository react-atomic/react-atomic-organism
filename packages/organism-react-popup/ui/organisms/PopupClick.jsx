import React, { Component } from "react";
import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import { getTimestamp } from "get-random-id";
import callfunc from "call-func";
import get from "get-object-value";

import PopupOverlay from "../molecules/PopupOverlay";
import DisplayPopupEl from "../organisms/DisplayPopupEl";
import { popupDispatch } from "../../src/popupDispatcher";

class PopupClick extends Component {
  static defaultProps = {
    once: true,
  };

  handleClick = () => this.open();

  open() {
    const { callback, once, popup } = this.props;
    if (once) {
      popupDispatch({
        type: "dom/update",
        params: {
          popup: build(popup, { wrap: PopupOverlay, doCallFunction: true })(),
        },
      });
      callfunc(callback);
    } else {
      this.setState({ show: true, bust: getTimestamp() }, () => {
        callfunc(callback);
      });
    }
  }

  close() {
    const { onClose } = this.props;
    this.setState({ show: false }, () => {
      callfunc(onClose);
    });
  }

  componentDidMount() {
    const {container} = this.props;
    console.warn('Container will retire soon, change to use component');
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
      once,
      ...reset
    } = this.props;
    const { show, bust } = this.state || {};
    const thisStyle = { ...style, ...Styles.container };
    let popupEl = null;
    if (show && !once) {
      popupEl = (
        <DisplayPopupEl bust={bust} key="popup-el">
          {build(popup, { wrap: PopupOverlay, doCallFunction: true })()}
        </DisplayPopupEl>
      );
    }
    const thisComponent = component || container || SemanticUI;
    const thisChildren = [children || get(thisComponent, ['props', 'children']) , popupEl];
    const props = {
      ...reset,
      onClick: this.handleClick,
      className: mixClass(className, "popup-click"),
      style: thisStyle,
    };
    return build(thisComponent)(props, thisChildren);
  }
}

export default PopupClick;

const Styles = {
  container: {
    cursor: "pointer",
  },
};

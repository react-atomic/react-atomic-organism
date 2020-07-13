import React, { PureComponent } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import { getTimestamp } from "get-random-id";
import callfunc from "call-func";

import { popupDispatch } from "../../src/popupDispatcher";
import PopupFloatEl from "../molecules/PopupFloatEl";
import DisplayPopupEl from "../organisms/DisplayPopupEl";

let closeTimer = {};

class PopupHover extends PureComponent {

  static defaultProps = {
    name: "popup-hover",
    component: SemanticUI
  };

  floatMouseOver = () => {
    this.isKeep = true;
  };

  floatMouseOut = () => {
    this.isKeep = false;
    this.close();
  };

  mouseOver = () => {
    const { name } = this.props;
    clearTimeout(closeTimer[name]);
    this.open();
  };

  mouseOut = () => {
    const { name } = this.props;
    clearTimeout(closeTimer[name]);
    closeTimer[name] = setTimeout(() => {
      this.close();
    }, 100);
  };

  open() {
    const { callback } = this.props;
    this.setState({ show: true, bust: getTimestamp() }, () => {
      callfunc(callback);
    });
  }

  close() {
    const { isKeep, onClose } = this.props;
    if (this.isKeep || isKeep) {
      return;
    }
    this.setState({ show: false }, () => {
      callfunc(onClose);
    });
  }

  handleDom = dom => (this.dom = dom);

  render() {
    const {
      children,
      popup,
      isKeep,
      toPool,
      alignParams,
      component,
      name,
      ...others
    } = this.props;
    const { show, bust } = this.state || {};
    let popupEl = null;
    if (show) {
      popupEl = (
        <DisplayPopupEl bust={bust} key="popup-el">
          <PopupFloatEl
            targetEl={this.dom} 
            toPool={toPool}
            name={name}
            alignParams={alignParams}
            onMouseEnter={this.floatMouseOver}
            onMouseLeave={this.floatMouseOut}
          >
            {popup}
          </PopupFloatEl>
        </DisplayPopupEl>
      );
    }
    const thisChildren = [children, popupEl];
    return build(component)(
      {
        refCb: this.handleDom,
        onMouseEnter: this.mouseOver,
        onMouseLeave: this.mouseOut,
        name,
        ...others
      },
      thisChildren
    );
  }
}

export default PopupHover;

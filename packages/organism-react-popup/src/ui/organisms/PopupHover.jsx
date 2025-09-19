

// @ts-check

import * as React from "react";
const { PureComponent } = React;
import { build, SemanticUI } from "react-atomic-molecule";
import { getTimestamp } from "get-random-id";
import callfunc from "call-func";

import PopupFloatEl from "../molecules/PopupFloatEl";
import DisplayPopupEl from "../organisms/DisplayPopupEl";

/**
 * @typedef {Object} PopupHoverProps
 * @property {string} [name] - Component name
 * @property {any} [component] - React component to render
 * @property {any} [children] - React children
 * @property {any} [popup] - Popup content
 * @property {any} [triggerItem] - Trigger item
 * @property {function} [callback] - Callback function
 * @property {boolean} [isKeep] - Keep popup open
 * @property {function} [onClose] - Close handler
 * @property {boolean} [toPool] - Use popup pool
 * @property {Object} [alignParams] - Alignment parameters
 */

/**
 * @typedef {Object} PopupHoverState
 * @property {any} [show] - Show state
 * @property {any} [triggerItem] - Trigger item state
 * @property {any} [bust] - Bust state
 */

const closeTimer = {};

/**
 * @extends {React.PureComponent<PopupHoverProps, PopupHoverState>}
 */
class PopupHover extends PureComponent {
  /** @type {PopupHoverProps} */
  props;

  /** @type {PopupHoverState} */
  state;

  /** @type {function(Partial<PopupHoverState>, function(): void=): void} */
  setState;

  static defaultProps = {
    name: "popup-hover",
    component: SemanticUI,
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

  /**
   * @param {HTMLElement} dom
   */
  handleDom = (dom) => (this.dom = dom);

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
        ...others,
      },
      thisChildren
    );
  }
}

export default PopupHover;

// @ts-check

import *  as React from "react";
const {PureComponent} = React;
import needCSS from "need-css";
import { popupDispatch } from "../../stores/popupStore";
import callfunc from "call-func";

/**
 * @typedef {Object} BasePopupProps
 * @property {string} [name] - Name of the popup
 * @property {function} [onError] - Error handler function
 */

/**
 * @typedef {Object} BasePopupState
 * @property {boolean} hasError - Whether component has error
 */


/**
 * @augments {PureComponent<BasePopupProps, BasePopupState>}
 */
class BasePopup extends PureComponent {
  /**
   * @type {BasePopupState}
   * @public
   */
  state = { hasError: false };
  

  static defaultProps = {
    name: "default",
  };

  /**
   * @param {BasePopupProps} props
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.setState = super.setState.bind(this);
    needCSS(["popup", "modal"], "semantic");
  }

  /**
   * @param {any} _error
   */
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  /**
   * @param {any} error
   * @param {any} info
   */
  componentDidCatch(error, info) {
    const { onError } = this.props;
    if (onError) {
      callfunc(onError, [error, info]);
    } else {
      console.error([error, info]);
    }
    this.setState({ hasError: true });
  }

  close() {
    popupDispatch({
      type: "dom/closeOne",
      params: {
        popup: this,
      },
    });
    return true;
  }
}

export default BasePopup;

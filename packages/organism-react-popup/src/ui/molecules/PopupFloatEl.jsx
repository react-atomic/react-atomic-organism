

// @ts-check

import getWindowOffset, { alignUI, getPositionString } from "get-window-offset";
import { toInt } from "to-percent-js";

import PopupOverlay from "../molecules/PopupOverlay";

/**
 * @typedef {import("./BasePopup").BasePopupProps & Object} PopupFloatElProps
 * @property {HTMLElement} [targetEl] - Target element to position relative to
 * @property {Object} [alignParams] - Alignment parameters
 * @property {number} [retryAt] - Retry timeout
 * @property {Object} [style] - CSS style object
 */

/**
 * @typedef {import("./BasePopup").BasePopupState & PositionInfo & Object} PopupFloatElState
 * @property {function} [refCb] - Ref callback function
 */

class PositionInfo {
  /**
   * @type number
   */
  top;
  /**
   * @type number
   */
  left;
  /**
   * @type string
   */
  className;
}

/**
 * @extends {PopupOverlay}
 */
class PopupFloatEl extends PopupOverlay {
  /** @type {PopupFloatElProps} */
  props;

  /** @type {PopupFloatElState} */
  state;

  /** @type {function(Partial<PopupFloatElState>, function(): void=): void} */
  setState;

  _mount = true;

  static defaultProps = {
    style: {
      position: "absolute",
      right: "auto",
    },
    name: "float",
    className: "popup",
    retryAt: 500,
  };

  /**
   * For monitor window resize
   */
  handleResize = () => {
    this.handleMoveTo();
  };

  handleMoveTo = () => {
    if (!this.floatEl || !this._mount) {
      return;
    }
    const { targetEl } = this.props;
    if (!document.body.contains(targetEl)) {
      return;
    }
    /**
     * @type PositionInfo
     */
    const pos = /** @type PositionInfo*/ (this.calPos());

    const diffTop = Math.abs(pos.top - toInt(this.floatTop));
    const diffLeft = Math.abs(pos.left - toInt(this.floatLeft));
    if (
      1 >= diffTop &&
      1 >= diffLeft &&
      pos.className === this.floatClassName
    ) {
      return;
    }
    this.floatTop = pos.top;
    this.floatLeft = pos.left;
    this.floatClassName = pos.className;
    this.setState(pos);
  };

  /**
   * @returns {PositionInfo|undefined}
   */
  calPos = () => {
    if (!this._mount) {
      return;
    }
    const faultPos = {
      top: -9999,
      left: -9999,
      className: "",
    };
    const { targetEl, alignParams } = this.props;
    if (!this.floatEl || !targetEl) {
      return faultPos;
    }
    const winInfo = getWindowOffset(targetEl);
    if (!winInfo) {
      return faultPos;
    }
    const myAlignParams = {
      exclude: ["lt", "lb", "rt", "rb"],
      ...alignParams,
    };
    const info = alignUI(targetEl, this.floatEl, myAlignParams, winInfo);
    if (!info) {
      console.error("can not get alignUI info");
      return faultPos;
    }
    const { move, loc } = info;
    const result = {
      top: move[1],
      left: move[0],
      className: getPositionString(loc),
    };
    return result;
  };

  /**
   * @param {HTMLElement} el
   */
  setFloatEl = (el) => {
    if (el) {
      this.floatEl = el;
    }
    this.handleMoveTo();
    const { retryAt } = this.props;
    if (retryAt) {
      setTimeout(() => this.handleMoveTo(), retryAt);
    }
  };

  /**
   * For extend class
   */
  getFloatEl() {
    return this.floatEl;
  }

  /**
   * @param {PopupFloatElProps} props
   */
  constructor(props) {
    // @ts-ignore - parent constructor expects props
    super(props);

    // Need exted state form parent class (PopupOverlay)
    this.state = props.state || {};
    this.state.refCb = this.setFloatEl;
  }

  componentDidMount() {
    this._mount = true;
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    this.handleMoveTo();
  }

  componentWillUnmount() {
    this._mount = false;
    window.removeEventListener("resize", this.handleResize);
  }
}

export default PopupFloatEl;

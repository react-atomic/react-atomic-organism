import React from 'react';
import {connect} from 'reshow-flux';
import {mixClass, SemanticUI} from 'react-atomic-molecule';
import getWindowOffset, {alignUI, getPositionString} from 'get-window-offset';

import PopupOverlay from '../molecules/PopupOverlay';

class PopupFloatEl extends PopupOverlay {
  _mount = false;
  state = {
    refCb: this.setFloatEl,
  };

  static defaultProps = {
    style: {
      position: 'absolute',
      right: 'auto',
    },
    name: 'float',
    className: 'popup',
  };

  /**
   * For monitor window resize
   */
  handleResize = () => {
    this.handleMoveTo();
  };

  handleMoveTo = () => {
    if (this.state && !this.state.show) {
      return;
    }
    const {targetEl} = this.props;
    if (!document.body.contains(targetEl)) {
      return;
    }
    const pos = this.calPos();
    if (!pos) {
      return;
    }
    if (
      pos.top === this.floatTop &&
      pos.left === this.floatLeft &&
      pos.width === this.floatWidth &&
      pos.height === this.floatHeight &&
      pos.className === this.floatClassName
    ) {
      return;
    }
    this.floatLeft = pos.left;
    this.floatTop = pos.top;
    this.floatWidth = pos.width;
    this.floatHeight = pos.height;
    this.floatClassName = pos.className;
    if (this._mount) {
      this.setState(pos);
    }
  };

  calPos = () => {
    const {targetEl, alignParams} = this.props;
    if (!this.floatEl || !targetEl || !getWindowOffset(targetEl)) {
      return false;
    }
    const info = alignUI(targetEl, this.floatEl, alignParams);
    if (!info) {
      console.error('can not get alignUI info');
      return;
    }
    const {move, loc} = info;
    const result = {
      top: move[1],
      left: move[0],
      className: getPositionString(loc),
    };
    return result;
  };

  setFloatEl = el => {
    if (el) {
      this.floatEl = el;
    }
    setTimeout(() => this.handleMoveTo());
  };

  /**
   * For extend class
   */
  getFloatEl() {
    return this.floatEl;
  }

  renderOverlay(props) {
    const {className, ...others} = props;
    const classes = mixClass('popup', className);
    return <SemanticUI {...others} className={classes} />;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState.prevProps) {
      return {
        isNeedUpdate: true,
        prevProps: nextProps
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this._mount = true;
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isNeedUpdate) {
      this.handleMoveTo();
      this.state.isNeedUpdate = false;
    }
  }

  componentWillUnmount() {
    this._mount = false;
    window.removeEventListener('resize', this.handleResize);
  }
}

export default connect(
  PopupFloatEl,
  {withProps: true},
);

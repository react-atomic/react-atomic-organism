import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import {d3DnD, d3Event} from 'd3-lib';
import getOffset, {unifyTouch} from 'getoffset';
import get from 'get-object-value';
import callfunc from 'call-func';
import {FUNCTION} from 'reshow-constant';
import {doc} from 'win-doc';

class DragAndDrop extends PureComponent {
  static defaultProps = {
    absX: 0,
    absY: 0,
  };

  start = {};
  last = {};
  el = null;

  handleStart = () => {
    const {onDragStart, zoom} = this.props;
    let zoomK = 1;
    if (FUNCTION === typeof zoom) {
      zoomK = get(zoom(), ['k'], 1);
    }
    const e = d3Event();
    const {x, y, sourceEvent} = e;
    const thisEvent = unifyTouch(sourceEvent);
    const {pageX, pageY} = thisEvent;
    const offset = getOffset(this.getEl());
    const elAbsX = ((pageX - offset.left) * 2) / zoomK;
    const elAbsY = ((pageY - offset.top) * 2) / zoomK;
    this.start = {
      x,
      y,
      elAbsX,
      elAbsY,
    };
    thisEvent.start = this.start;
    callfunc(onDragStart, [thisEvent]);
  };

  handleDrag = () => {
    const e = d3Event();
    const {x: moveX, y: moveY, sourceEvent} = e;
    const {x: startX, y: startY, elAbsX, elAbsY} = this.start;
    let {absX, absY, onDrag} = this.props;
    absX += startX + moveX - elAbsX;
    absY += startY + moveY - elAbsY;
    const thisEvent = unifyTouch(sourceEvent);
    const destTarget = callfunc(
      doc().elementFromPoint,
      [thisEvent.clientX, thisEvent.clientY],
      doc(),
    );
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.destTarget = destTarget;
    thisEvent.absX = absX;
    thisEvent.absY = absY;
    this.last = thisEvent;
    callfunc(onDrag, [thisEvent]);
  };

  handleEnd = () => {
    const {onDragEnd} = this.props;
    const sourceEvent = d3Event().sourceEvent;
    const thisEvent = unifyTouch(sourceEvent);
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.last = this.last;
    thisEvent.start = this.start;
    callfunc(onDragEnd, [thisEvent]);
  };

  getEl() {
    return this.el || callfunc(this.props.onGetEl);
  }

  componentDidMount() {
    d3DnD({
      el: this.getEl(),
      start: this.handleStart,
      drag: this.handleDrag,
      end: this.handleEnd,
    });
  }

  render() {
    const {
      component,
      style,
      absX,
      absY,
      zoom,
      onGetEl,
      onDragStart,
      onDrag,
      onDragEnd,
      ...props
    } = this.props;
    const build = isValidElement(component) ? cloneElement : createElement;
    props.style = {
      ...style,
      ...Styles.container,
      ...get(component, ['props', 'style']),
    };
    if (!onGetEl) {
      props.refCb = el => (this.el = el);
    }
    return build(component, props);
  }
}

export default DragAndDrop;

const Styles = {
  container: {
    cursor: 'move',
    pointerEvents: 'all',
  },
};

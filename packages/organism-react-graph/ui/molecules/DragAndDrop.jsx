import React, {PureComponent} from 'react';
import {build} from 'react-atomic-molecule';
import {d3DnD, d3Event} from 'd3-lib';
import getOffset, {unifyTouch} from 'getoffset';
import get from 'get-object-value';
import callfunc from 'call-func';
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
    const zoomK = get(callfunc(zoom), ['k'], 1);
    const {x: startX, y: startY, sourceEvent} = d3Event();
    const thisEvent = unifyTouch(sourceEvent);
    const offset = getOffset(this.el);
    const {top: fromY, left: fromX, w, h} = offset || {};
    this.start = {
      offset,
      startX,
      startY,
      fromX: fromX - w,
      fromY: fromY + h,
      zoomK,
    };
    thisEvent.start = this.start;
    callfunc(onDragStart, [thisEvent]);
  };

  handleDrag = () => {
    const {x, y, dx, dy, sourceEvent} = d3Event();
    const thisEvent = unifyTouch(sourceEvent);
    const {absX, absY, onDrag, zoom} = this.props;
    const zoomK = get(callfunc(zoom), ['k'], 1);
    const nextAbsX = absX + dx / zoomK;
    const nextAbsY = absY + dy / zoomK;
    const destTarget = callfunc(
      doc().elementFromPoint,
      [thisEvent.clientX, thisEvent.clientY],
      doc(),
    );
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.destTarget = destTarget;
    thisEvent.absX = nextAbsX;
    thisEvent.absY = nextAbsY;
    this.last = thisEvent;
    callfunc(onDrag, [thisEvent, this.start]);
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
    return this.el;
  }

  handleElChange = el => {
    if (el && (!this.el || !this.el.isSameNode(el))) {
      this.el = el;
      d3DnD({
        el,
        start: this.handleStart,
        drag: this.handleDrag,
        end: this.handleEnd,
      });
    }
    return this.el;
  };

  render() {
    const {
      component,
      style,
      absX,
      absY,
      zoom,
      refCb,
      onDragStart,
      onDrag,
      onDragEnd,
      ...props
    } = this.props;
    const {style: compStyle, refCb: compRefcb} = get(component, ['props'], {});
    props.style = {
      ...Styles.container,
      ...style,
      ...compStyle,
    };
    if (refCb || compRefcb) {
      props.refCb = el => {
        this.handleElChange(el);
        callfunc(refCb, [el]);
        callfunc(compRefcb, [el]);
      };
    } else {
      props.onGetEl = this.handleElChange;
    }

    return build(component)(props);
  }
}

export default DragAndDrop;

const Styles = {
  container: {
    cursor: 'grab',
    pointerEvents: 'all',
  },
};

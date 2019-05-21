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
    const {x: fromX, y: fromY, sourceEvent} = d3Event();
    const thisEvent = unifyTouch(sourceEvent);
    this.start = {
      fromX,
      fromY,
      zoomK,
    };
    thisEvent.start = this.start;
    callfunc(onDragStart, [thisEvent]);
  };

  handleDrag = () => {
    const {x, y, dx, dy, sourceEvent} = d3Event();
    const thisEvent = unifyTouch(sourceEvent);
    const {fromX, fromY} = this.start;
    const {absX, absY, onDrag, zoom} = this.props;
    const zoomK = get(callfunc(zoom), ['k'], 1);
    const nextAbsX = absX + ((x - fromX) / zoomK);
    const nextAbsY = absY + ((y - fromY) / zoomK);
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
    return this.el;
  }

  handleElChange = el => {
    if (el) {
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
      ...style,
      ...Styles.container,
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
    cursor: 'move',
    pointerEvents: 'all',
  },
};

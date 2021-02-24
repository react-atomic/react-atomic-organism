import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { build } from "react-atomic-molecule";
import { d3DnD } from "d3-lib";
import getOffset, { unifyTouch } from "getoffset";
import get from "get-object-value";
import callfunc from "call-func";
import { doc } from "win-doc";

const DragAndDrop = forwardRef((props, ref) => {
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
    ...others
  } = props;
  const startPoint = useRef();
  const lastPoint = useRef();
  const lastProps = useRef({});
  lastProps.current = props;
  const thisEl = useRef();
  const handleStart = (d3Event) => {
    const {zoom} = lastProps.current;
    const zoomK = get(callfunc(zoom), ["k"], 1);
    const { x: fromX, y: fromY, sourceEvent } = d3Event;
    const thisEvent = unifyTouch(sourceEvent);
    const offset = getOffset(thisEl.current);
    const { left: elStartX, top: elStartY, w, h } = offset || {};
    thisEvent.start = {
      offset,
      fromX,
      fromY,
      elStartX: elStartX - w,
      elStartY,
      zoomK,
    };
    startPoint.current = thisEvent.start;
    lastPoint.current = thisEvent.start;
    callfunc(onDragStart, [thisEvent]);
  };

  const handleDrag = (d3Event) => {
    const {absX, absY, zoom} = lastProps.current;
    const { x, y, dx, dy, sourceEvent } = d3Event;
    const thisEvent = unifyTouch(sourceEvent);
    const zoomK = get(callfunc(zoom), ["k"], 1);
    const nextAbsX = absX + dx / zoomK;
    const nextAbsY = absY + dy / zoomK;
    const destTarget = callfunc(
      doc().elementFromPoint,
      [thisEvent.clientX, thisEvent.clientY],
      doc()
    );
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.destTarget = destTarget;
    thisEvent.absX = nextAbsX;
    thisEvent.absY = nextAbsY;
    lastPoint.current = thisEvent;
    callfunc(onDrag, [thisEvent, startPoint.current]);
  };

  const handleEnd = (d3Event) => {
    const sourceEvent = d3Event.sourceEvent;
    const thisEvent = unifyTouch(sourceEvent);
    const offset = getOffset(thisEl.current);
    lastPoint.current.offset = offset;
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.last = lastPoint.current;
    thisEvent.start = startPoint.current;
    callfunc(onDragEnd, [thisEvent]);
  };

  const handleElChange = (el) => {
    if (el && (!thisEl.current || !thisEl.current.isSameNode(el))) {
      thisEl.current = el;
      d3DnD({
        el,
        start: handleStart,
        drag: handleDrag,
        end: handleEnd,
      });
    }
    return thisEl.current;
  };

  useImperativeHandle(ref, () => ({
    getEl: () => thisEl.current
  }));

  const { style: compStyle, refCb: compRefcb } = get(component, ["props"], {});
  others.style = {
    ...Styles.container,
    ...style,
    ...compStyle,
  };
  if (refCb || compRefcb) {
    others.refCb = (el) => {
      handleElChange(el);
      callfunc(refCb, [el]);
      callfunc(compRefcb, [el]);
    };
  } else {
    others.onGetEl = handleElChange;
  }

  return build(component)(others);
});

DragAndDrop.displayName= "DragAndDrop";

DragAndDrop.defaultProps = {
  absX: 0,
  absY: 0,
};

export default DragAndDrop;

const Styles = {
  container: {
    cursor: "grab",
    pointerEvents: "all",
  },
};

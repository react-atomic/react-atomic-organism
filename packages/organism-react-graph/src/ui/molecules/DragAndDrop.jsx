import React, {
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo,
  useState,
  forwardRef,
} from "react";
import { build } from "react-atomic-molecule";
import { useD3 } from "d3-lib";
import getOffset, { unifyTouch } from "getoffset";
import callfunc from "call-func";
import { doc } from "win-doc";

const useDragAndDrop = (props) => {
  const [isLoad, d3] = useD3(props.onD3Load);

  const startPoint = useRef();
  const lastPoint = useRef({});
  const lastProps = useRef({});
  const thisEl = useRef();
  const [isDraging, setIsDraging] = useState(false);

  if (lastProps.current !== props) {
    lastProps.current = props;
  }

  const expose = {
    getEl: () => thisEl.current,
    setXY: (x, y) => {
      lastPoint.current.absX = x;
      lastPoint.current.absY = y;
    },
  };

  if (!isLoad) {
    return { isLoad, expose };
  }

  const handleStart = (d3Event) => {
    const { keepLastAbsXY, zoom, onDragStart } = lastProps.current;
    const zoomK = callfunc(zoom)?.k ?? 1;
    const { x: fromX, y: fromY, sourceEvent } = d3Event;
    const thisEvent = unifyTouch(sourceEvent);
    const offset = getOffset(thisEl.current);
    const { x: elStartX, y: elStartY, w, h } = offset || {};
    let absX = 0;
    let absY = 0;
    if (keepLastAbsXY) {
      absX = lastPoint.current?.absX || 0;
      absY = lastPoint.current?.absY || 0;
    }
    thisEvent.start = {
      absX,
      absY,
      offset,
      fromX,
      fromY,
      elStartX,
      elStartY,
      zoomK,
      offsetX: thisEvent.offsetX,
      offsetY: thisEvent.offsetY,
    };
    startPoint.current = thisEvent.start;
    lastPoint.current = thisEvent.start;
    setIsDraging(true);
    callfunc(onDragStart, [thisEvent]);
  };

  const handleDrag = (d3Event) => {
    const { x, y, dx, dy, sourceEvent } = d3Event;
    if (!dx && !dy) {
      return;
    }
    const { zoom, onDrag } = lastProps.current;
    const { absX, absY } = lastPoint.current;
    const thisEvent = unifyTouch(sourceEvent);
    const zoomK = callfunc(zoom)?.k ?? 1;
    const nextAbsX = absX + dx / zoomK;
    const nextAbsY = absY + dy / zoomK;
    const getPointerXY = (e) => () =>
      [e.clientX - e.start.offsetX, e.clientY - e.start.offsetY];
    const getAllPointer = (e) => () => {
      const { w, h } = e.start.offset || {};
      const tl = e.getPointerXY();
      const result = {
        tl,
        tr: [tl[0] + w, tl[1]],
        br: [tl[0] + w, tl[1] + h],
        bl: [tl[0], tl[1] + h],
        client: [e.clientX, e.clientY],
      };
      return result;
    };
    const getPointerTarget = (e) => (point) => {
      const thisPoint = null != point ? point : e.getPointerXY();
      const tarEl = callfunc(doc().elementFromPoint, thisPoint, doc());
      if (tarEl) {
        tarEl.pointXY = thisPoint;
        return tarEl;
      }
    };
    const getClientPointerTarget =
      (e) =>
      (point = {}) => {
        const thisPoint = [point.x ?? e.clientX, point.y ?? e.clientY];
        return e.getPointerTarget(thisPoint);
      };
    thisEvent.start = startPoint.current;
    thisEvent.getPointerXY = getPointerXY(thisEvent);
    thisEvent.getAllPointer = getAllPointer(thisEvent);
    thisEvent.getPointerTarget = getPointerTarget(thisEvent);
    thisEvent.getClientPointerTarget = getClientPointerTarget(thisEvent);
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.absX = nextAbsX;
    thisEvent.absY = nextAbsY;
    lastPoint.current = thisEvent;
    callfunc(onDrag, [thisEvent]);
  };

  const handleEnd = (d3Event) => {
    const sourceEvent = d3Event.sourceEvent;
    const thisEvent = unifyTouch(sourceEvent);
    lastPoint.current.offset = getOffset(thisEl.current);
    thisEvent.sourceEvent = sourceEvent;
    thisEvent.last = lastPoint.current;
    thisEvent.start = startPoint.current;
    setIsDraging(false);
    callfunc(lastProps.current.onDragEnd, [thisEvent]);
  };

  const handleElChange = (el) => {
    if (el && (!thisEl.current || !thisEl.current.isSameNode(el))) {
      thisEl.current = el;
      d3.d3DnD({
        el,
        start: handleStart,
        drag: handleDrag,
        end: handleEnd,
      });
    }
    return thisEl.current;
  };

  return { isLoad, handleElChange, isDraging, expose };
};

const DragAndDrop = forwardRef((props, ref) => {
  const { isLoad, handleElChange, isDraging, expose } = useDragAndDrop(props);
  useImperativeHandle(ref, () => expose, []);

  return useMemo(() => {
    if (!isLoad) {
      return null;
    }
    const {
      keepLastAbsXY,
      component,
      style,
      zoom,
      refCb,
      onDragStart,
      onDrag,
      onDragEnd,
      onD3Load,
      ...others
    } = props;
    const { style: compStyle, refCb: compRefcb } = component?.props || {};
    others.style = {
      ...Styles.container,
      ...(isDraging ? Styles.drag : {}),
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
  }, [isLoad, props, isDraging]);
});

DragAndDrop.displayName = "DragAndDrop";

export default DragAndDrop;

const Styles = {
  container: {
    cursor: "grab",
    pointerEvents: "all",
  },
  drag: {
    cursor: "grabbing",
  },
};

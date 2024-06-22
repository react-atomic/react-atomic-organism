// @ts-check

/**
 * clientX vs offsetX
 * https://i.sstatic.net/vqNHJ.png
 */

import {
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
  forwardRef,
} from "react";
import { build } from "react-atomic-molecule";
import { useD3 } from "d3-lib";
import getOffset, { unifyTouch } from "getoffset";
import callfunc from "call-func";
import { doc } from "win-doc";
import { useRefUpdate } from "reshow-hooks";

/**
 * @typedef {import("reshow-build").Component} Component
 */

/**
 * @typedef {import("getoffset").OffsetType} OffsetType
 */

/**
 * @typedef {object} PointType
 * @property {number} absX
 * @property {number} absY
 * @property {OffsetType=} offset
 */

const useDragAndDrop = (/**@type any*/ props) => {
  const [isLoad, d3] = useD3(props.onD3Load);

  const startPoint = useRef();
  const lastPoint = /**@type {React.MutableRefObject<PointType>}*/ (
    useRef({ absX: 0, absY: 0, offset: undefined })
  );
  const lastProps = useRefUpdate(props);
  const thisEl = /**@type {React.MutableRefObject<HTMLElement>}*/ (useRef());
  const [isDraging, setIsDraging] = useState(false);

  const expose = {
    getEl: () => thisEl.current,
    /**
     * @param {number} x
     * @param {number} y
     */
    setXY: (x, y) => {
      lastPoint.current.absX = x;
      lastPoint.current.absY = y;
    },
  };

  if (!isLoad) {
    return { isLoad, expose };
  }

  const handleStart = (/**@type any*/ d3Event) => {
    const { keepLastAbsXY, zoom, onDragStart } = lastProps.current;
    const zoomK = callfunc(zoom)?.k ?? 1;
    const { x: fromX, y: fromY, sourceEvent } = d3Event;
    const thisEvent = unifyTouch(sourceEvent);
    if (thisEl.current) {
      const offset = getOffset(thisEl.current);
      const { x: elStartX, y: elStartY } = /**@type OffsetType*/ (offset);
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
    }
  };

  const handleDrag = (/**@type any*/ d3Event) => {
    const { dx, dy, sourceEvent } = d3Event;
    if (!dx && !dy) {
      return;
    }
    const { zoom, onDrag } = lastProps.current;
    const { absX, absY } = lastPoint.current;
    const thisEvent = unifyTouch(sourceEvent);
    const zoomK = callfunc(zoom)?.k ?? 1;
    const nextAbsX = absX + dx / zoomK;
    const nextAbsY = absY + dy / zoomK;
    const getPointerXY = (/**@type any*/ e) => () => [
      e.clientX - e.start.offsetX,
      e.clientY - e.start.offsetY,
    ];
    const getAllPointer = (/**@type any*/ e) => () => {
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
    const getPointerTarget = (/**@type any*/ e) => (/**@type any*/ point) => {
      const thisPoint = null != point ? point : e.getPointerXY();
      const tarEl = callfunc(doc().elementFromPoint, thisPoint, doc());
      if (tarEl) {
        tarEl.pointXY = thisPoint;
        return tarEl;
      }
    };
    const getClientPointerTarget =
      (/**@type any*/ e) =>
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

  const handleEnd = (/**@type any*/ d3Event) => {
    const sourceEvent = d3Event.sourceEvent;
    const thisEvent = unifyTouch(sourceEvent);
    if (thisEl.current) {
      lastPoint.current.offset = getOffset(thisEl.current);
      thisEvent.sourceEvent = sourceEvent;
      thisEvent.last = lastPoint.current;
      thisEvent.start = startPoint.current;
      setIsDraging(false);
      callfunc(lastProps.current.onDragEnd, [thisEvent]);
    }
  };

  const handleElChange = (/**@type HTMLElement*/ el) => {
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

/**
 * @typedef {object} DragAndDropProps
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {boolean=} keepLastAbsXY
 * @property {Component=} component
 * @property {import("react").CSSProperties=} style
 * @property {import("../../types").DragAndDropStyle=} dragAndDropStyle
 * @property {import("../../types").SetZoom=} zoom
 * @property {Function=} refCb
 * @property {Function=} onDragStart
 * @property {Function=} onDrag
 * @property {Function=} onDragEnd
 * @property {Function=} onD3Load
 */

/**
 * @type React.ForwardRefExoticComponent<?, DragAndDropProps>
 */
const DragAndDrop = forwardRef((props, ref) => {
  const {
    isLoad,
    handleElChange = () => {},
    isDraging,
    expose,
  } = useDragAndDrop(props);
  useImperativeHandle(ref, () => expose, []);

  return useMemo(() => {
    /**
     * @type {DragAndDropProps}
     */
    const {
      builtInOnly,
      renderFirst,
      keepLastAbsXY,
      component,
      zoom,
      refCb,
      onDragStart,
      onDrag,
      onDragEnd,
      onD3Load,
      dragAndDropStyle = {
        droppable: {
          cursor: "grab",
        },
        dragging: {
          cursor: "grabbing",
        },
      },
      ...restProps
    } = props;
    if (!isLoad) {
      return renderFirst ? build(component)() : null;
    }
    const { style: compStyle, refCb: compRefCb } =
      /**@type any*/ (component)?.props || {};

    /**
     * @type any
     */
    const nextProps = {
      ...restProps,
      style: {
        ...Styles.container,
        ...dragAndDropStyle.droppable,
        ...(isDraging ? dragAndDropStyle.dragging : {}),
        ...restProps.style,
        ...compStyle,
      },
    };
    const handleRef = (/**@type HTMLElement*/ el) => {
      handleElChange(el);
      callfunc(refCb, [el]);
      callfunc(compRefCb, [el]);
    };

    if (builtInOnly) {
      nextProps.ref = handleRef;
    } else {
      if (refCb || compRefCb) {
        nextProps.refCb = handleRef;
      } else {
        nextProps.onGetEl = handleRef;
      }
    }
    return build(component)(nextProps);
  }, [isLoad, props, isDraging]);
});

DragAndDrop.displayName = "DragAndDrop";

export default DragAndDrop;

const Styles = {
  container: {
    pointerEvents: "all",
  },
};

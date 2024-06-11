// @ts-check

import * as React from "react";
const { useState } = React;

import { build } from "react-atomic-molecule";

import { useMounted, useRefUpdate } from "reshow-hooks";

import callfunc from "call-func";

import DragAndDrop from "./DragAndDrop";
import { StartPointInfo } from "../../types";

/**
 * @typedef {object} DDWrapper
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {boolean=} fixedX
 * @property {boolean=} fixedY
 * @property {number=} minX
 * @property {number=} maxX
 * @property {number=} minY
 * @property {number=} maxY
 * @property {StartPointInfo=} startPoint
 * @property {Function=} onDrag
 * @property {Function=} onDragEnd
 * @property {Function=} refCb
 * @property {any=} children
 * @property {React.CSSProperties=} style
 */

export const useDDWrapper = (/**@type DDWrapper*/ props) => {
  const lastProps = useRefUpdate(props);
  const [{ absX, absY, startPoint, isDraging }, setState] = useState(() => ({
    absX: 0,
    absY: 0,
    isDraging: false,
    startPoint: props.startPoint,
  }));
  const isMount = useMounted();

  const move = (/**@type any*/ e) => {
    const { absX, absY, start } = e;
    if (isMount()) {
      setState((prev) => ({
        ...prev,
        isDraging: true,
        absX,
        absY,
        startPoint: start,
      }));
      callfunc(lastProps.current.onDrag, [e]);
    }
  };

  const handler = {
    drag: (/**@type any*/ e) => move(e),
    dragEnd: (/**@type any*/ e) => {
      callfunc(lastProps.current.onDragEnd, [e]);
      setState((prev) => ({
        ...prev,
        isDraging: false,
      }));
    },
  };
  return {
    handler,
    absX,
    absY,
    startPoint,
    isDraging,
  };
};

const DDWrapper = (/**@type DDWrapper*/ props) => {
  const { handler, absX, absY, startPoint, isDraging } = useDDWrapper(props);
  const {
    builtInOnly,
    renderFirst,
    refCb,
    children,
    style: propsStyle,
    onDrag,
    onDragEnd,
    fixedX,
    fixedY,
    minX,
    maxX,
    minY,
    maxY,
    ...restProps
  } = props;

  /**
   * @type any
   */
  let moveStyle = {};
  if (isDraging) {
    let toX = absX;
    let toY = absY;
    if (fixedX) {
      toX = 0;
    } else if (fixedY) {
      toY = 0;
    }
    if (null != minX && toX < minX) {
      toX = minX;
    }
    if (null != maxX && toX > maxX) {
      toX = maxX;
    }
    if (null != minX && toX < minX) {
      toX = minX;
    }
    if (null != maxX && toX > maxX) {
      toX = maxX;
    }
    moveStyle = {
      ...Styles.move,
      transform: toX || toY ? `translate(${toX}px, ${toY}px)` : null,
      left: startPoint?.elStartX,
      top: startPoint?.elStartY,
    };
  }

  /**
   * @param {React.CSSProperties} style
   * @returns {React.CSSProperties}
   */
  const mergeStyle = (style) => {
    return {
      ...propsStyle,
      ...children?.props?.style,
      ...style,
    };
  };

  const handleRef = (/**@type HTMLElement*/ el) => {
    callfunc(children?.props?.refCb, [el]);
    callfunc(refCb, [el]);
  };

  /**
   * @type any
   */
  const nextProps = {
    ...restProps,
    style: mergeStyle(moveStyle),
  };

  const dragEl = build(children)(nextProps);

  return (
    <DragAndDrop
      builtInOnly={builtInOnly}
      renderFirst={renderFirst}
      refCb={handleRef}
      onDrag={handler.drag}
      onDragEnd={handler.dragEnd}
      component={dragEl}
    />
  );
};

export default DDWrapper;

const Styles = {
  move: {
    position: "absolute",
    pointerEvents: "none",
  },
};

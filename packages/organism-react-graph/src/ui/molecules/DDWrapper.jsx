import React, { useCallback, useState, useEffect, useRef } from "react";

import { build } from "react-atomic-molecule";

import { useMounted } from "reshow-hooks";

import callfunc from "call-func";

import DragAndDrop from "./DragAndDrop";

const useDDWrapper = (props) => {
  const { onDrag: propsOnDrag, onDragEnd: propsOnDragEnd } = props;
  const [{ absX, absY, startPoint, isDraging }, setState] = useState(() => ({
    absX: 0,
    absY: 0,
    isDraging: false,
  }));
  const isMount = useMounted();
  const dnd = useRef();
  const comp = useRef();

  const move = (e) => {
    const { absX, absY, start, clientX, clientY, ...other } = e;
    let sortTarget;
    const floatXY = {
      x: clientX,
      y: clientY,
    };
    if (isMount()) {
      setState((prev) => ({
        ...prev,
        isDraging: true,
        absX,
        absY,
        startPoint: start,
      }));
      callfunc(propsOnDrag, [e]);
    }
  };

  const handler = {
    drag: (e) => move(e),
    dragEnd: (e) => {
      callfunc(propsOnDragEnd, [e]);
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
    dnd,
    comp,
    isDraging,
  };
};

const DDWrapper = (props) => {
  const { handler, absX, absY, startPoint, dnd, comp, isDraging } =
    useDDWrapper(props);
  const {
    refCb,
    type,
    children,
    style: propsStyle,
    onDrag,
    onDragEnd,
    ...otherProps
  } = props;

  const moveStyle = isDraging
    ? {
        ...Styles.move,
        transform: absX || absY ? `translate(${absX}px, ${absY}px)` : null,
        left: startPoint?.elStartX,
        top: startPoint?.elStartY,
      }
    : {};

  const mergeStyle = (style) => {
    return {
      ...propsStyle,
      ...children?.props?.style,
      ...style,
    };
  };

  const dragEl = build(children)({
    ...otherProps,
    style: mergeStyle(moveStyle),
    refCb: (el) => {
      callfunc(children?.props?.refCb, [el]);
      callfunc(refCb, [el]);
      comp.current = el;
    },
  });

  return (
    <DragAndDrop
      ref={dnd}
      onDrag={handler.drag}
      onDragEnd={handler.dragEnd}
      component={dragEl}
    />
  );
};

export default DDWrapper;

export { useDDWrapper };

const Styles = {
  move: {
    position: "absolute",
    pointerEvents: "none",
  },
};

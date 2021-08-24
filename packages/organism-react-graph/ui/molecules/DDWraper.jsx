import React, { useCallback, useState, useEffect, useRef } from "react";

import { build, useMounted } from "react-atomic-molecule";

import callfunc from "call-func";

import DragAndDrop from "./DragAndDrop";

const useDDWraper = (props) => {
  const { onDrag: propsOnDrag, onDragEnd: propsOnDragEnd } = props;
  const [state, setState] = useState(() => ({
    absX: 0,
    absY: 0,
    isDraging: false,
  }));
  const { absX, absY, startPoint, isDraging, destTarget } = state;
  const isMount = useMounted();
  const dnd = useRef();
  const comp = useRef();

  const move = (e) => {
    const {
      absX,
      absY,
      startPoint,
      destTarget,
      clientX,
      clientY,
      ...other
    } = e;
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
        startPoint,
        destTarget,
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
    destTarget,
  };
};

const DDWraper = (props) => {
  const {
    handler,
    absX,
    absY,
    startPoint,
    dnd,
    comp,
    isDraging,
    destTarget,
  } = useDDWraper(props);
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

export default DDWraper;

export { useDDWraper };

const Styles = {
  move: {
    position: "absolute",
    pointerEvents: "none",
  },
};

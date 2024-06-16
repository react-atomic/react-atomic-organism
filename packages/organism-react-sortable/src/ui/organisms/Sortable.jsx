// @ts-check
import { DDWrapper } from "organism-react-graph";
import * as React from "react";
import { nearWhere } from "get-window-offset";
import query from "css-query-selector";
import build from "reshow-build";
const { useState, useRef } = React;

/**
 * @typedef {import("get-window-offset").Coordinate} Coordinate
 */

const useSortable = ({ setSortElement, fixedX, fixedY }) => {
  const [isDraging, setIsDraging] = useState(false);
  const comp = /**@type {React.MutableRefObject<HTMLElement>}*/ (useRef());

  /**
   * @param {HTMLElement} targetEl
   * @param {Coordinate} pointXY
   */
  const handleSortElement = (targetEl, pointXY) => {
    const near = nearWhere(targetEl, pointXY);
    const sortEl = comp.current;
    const nextId = /**@type HTMLElement*/ (targetEl.nextSibling)?.getAttribute(
      "name",
    );
    const prevId = /**@type HTMLElement*/ (
      targetEl.previousSibling
    )?.getAttribute("name");
    const sortId = sortEl?.getAttribute("name");

    let reverse;
    if (targetEl.getAttribute("data-first")) {
      reverse = false;
    } else if (targetEl.getAttribute("data-last")) {
      reverse = near.top ? false : true;
    } else {
      reverse = (nextId === sortId || prevId === sortId) && near.top;
    }

    setSortElement({
      targetEl,
      targetId: targetEl.getAttribute("name"),
      sortEl,
      sortId,
      reverse,
    });
  };

  /**
   * @param {HTMLElement} pointerTarget
   */
  const handleSortTarget = (pointerTarget) => {
    if (!pointerTarget) {
      return false;
    }
    const type = pointerTarget.getAttribute("data-type");
    if (!type) {
      const sortTarget = query.ancestor(
        pointerTarget,
        '[data-type="sortable"]',
      );
      if (sortTarget) {
        return sortTarget;
      }
    } else {
      if ("sortable" === type) {
        return pointerTarget;
      }
    }
  };

  const handler = {
    drag: (/**@type any*/ e) => {
      if (!comp.current) {
        return;
      }
      setIsDraging(true);
      const { getPointerTarget, getClientPointerTarget, getAllPointer } = e;
      let pointerTarget;
      if (fixedX) {
        pointerTarget = getClientPointerTarget({ x: e.start.offset.x });
      } else if (fixedY) {
        pointerTarget = getClientPointerTarget({ y: e.start.offset.y });
      } else {
        pointerTarget = getPointerTarget();
      }

      if (!pointerTarget) {
        return;
      }

      let sortTarget = handleSortTarget(pointerTarget);
      if (!sortTarget) {
        const allPointer = getAllPointer();
        ["tr", "br", "bl"].some((key) => {
          pointerTarget = getPointerTarget(allPointer[key]);
          sortTarget = handleSortTarget(pointerTarget);
          if (sortTarget) {
            return true;
          } else {
            return false;
          }
        });
      }
      if (sortTarget) {
        const pointXY = {
          x: pointerTarget.pointXY[0],
          y: pointerTarget.pointXY[1],
        };
        handleSortElement(sortTarget, pointXY);
      }
    },
    dragEnd: () => {
      setIsDraging(false);
    },
  };
  return { isDraging, handler, comp };
};

export const Sort = (/**@type any*/ props) => {
  const { handler, isDraging, comp } = useSortable(props);
  const {
    children,
    setSortElement,
    style: propsStyle,
    activeStyle: propsActiveStyle,
    ...otherProps
  } = props;

  const mergeStyle = (/**@type React.CSSProperties*/ style) => {
    return {
      ...propsStyle,
      ...children.props?.style,
      ...style,
    };
  };

  const item = build(
    build(children)({
      ...otherProps,
      "data-type": "sortable",
    }),
  );

  const activeStyle = isDraging ? propsActiveStyle : null;

  const shadowEl = isDraging ? item({ style: mergeStyle(activeStyle) }) : null;
  const dragEl = item({
    style: mergeStyle(),
    refCb: (/**@type any*/ el) => (comp.current = el),
  });

  return (
    <>
      <DDWrapper onDrag={handler.drag} onDragEnd={handler.dragEnd}>
        {dragEl}
      </DDWrapper>
      {shadowEl}
    </>
  );
};

// @ts-check
import { DDWrapper } from "organism-react-graph";
import * as React from "react";
import { nearWhere } from "get-window-offset";
import query from "css-query-selector";
import build from "reshow-build";
import { getSortId } from "../../getSortId";
const { useState, useRef } = React;

/**
 * @typedef {import("../../types").SortData} SortData
 */

/**
 * @typedef {import("get-window-offset").Coordinate} Coordinate
 */

const useSortable = ({
  setSortData = (/**@type SortData*/ _p) => {},
  fixedX,
  fixedY,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const comp = /**@type {React.MutableRefObject<HTMLElement>}*/ (useRef());

  /**
   * @param {HTMLElement} targetEl
   * @param {HTMLElement} floatEl
   * @param {Coordinate} adjustXY
   */
  const handleSortElement = (targetEl, floatEl, adjustXY) => {
    const near = nearWhere(targetEl, floatEl, { adjustXY });
    const sortEl = comp.current;
    const nextId = getSortId(/**@type HTMLElement*/ (targetEl.nextSibling));
    const prevId = getSortId(/**@type HTMLElement*/ (targetEl.previousSibling));
    const sortId = getSortId(sortEl);

    let reverse;
    const targetParentNode = targetEl.parentNode;
    if (null != targetParentNode) {
      if (targetParentNode.firstChild?.isSameNode(targetEl)) {
        reverse = false;
      } else if (targetParentNode.lastChild?.isSameNode(targetEl)) {
        reverse = near.top ? false : true;
      }
    }
    if (null == reverse) {
      reverse = (nextId === sortId || prevId === sortId) && near.top;
    }

    setSortData({
      targetEl,
      targetId: getSortId(targetEl) || "",
      sortEl,
      sortId: sortId || "",
      reverseOrder: reverse,
    });
  };

  /**
   * @param {HTMLElement} pointerTarget
   */
  const handleSortTarget = (pointerTarget) => {
    if (!pointerTarget) {
      return false;
    }
    const type = pointerTarget.getAttribute("data-sort-type");
    if (!type) {
      const sortTarget = query.ancestor(
        pointerTarget,
        '[data-sort-type="sortable"]'
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
        handleSortElement(sortTarget, comp.current, {
          x: e.offsetX,
          y: e.offsetY,
        });
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
    builtInOnly,
    fixedX,
    renderFirst,
    children,
    setSortData,
    style: propsStyle,
    activeStyle: propsActiveStyle,
    ...otherProps
  } = props;

  const mergeStyle = (/**@type React.CSSProperties*/ style) => {
    return {
      ...propsStyle,
      ...children?.props?.style,
      ...style,
    };
  };

  const item = build(
    build(children)({
      ...otherProps,
      "data-sort-type": "sortable",
    })
  );

  const activeStyle = isDraging ? propsActiveStyle : null;

  const shadowEl = isDraging ? item({ style: mergeStyle(activeStyle) }) : null;
  const handleFloatRef = (/**@type HTMLElement*/ el) => (comp.current = el);
  const dragEl = item({
    style: mergeStyle(),
  });

  return (
    <>
      <DDWrapper
        onDrag={handler.drag}
        onDragEnd={handler.dragEnd}
        builtInOnly={builtInOnly}
        fixedX={fixedX}
        renderFirst={renderFirst}
        refCb={handleFloatRef}
      >
        {dragEl}
      </DDWrapper>
      {shadowEl}
    </>
  );
};

// @ts-check
import * as React from "react";
const { useState, useRef } = React;
import { DDWrapper } from "organism-react-graph";
import { nearWhere } from "get-window-offset";
import query from "css-query-selector";
import build from "reshow-build";
import { getSortId } from "../../getSortId";

/**
 * @typedef {import("../../types").SortData} SortData
 */

/**
 * @typedef {import("get-window-offset").Coordinate} Coordinate
 */

/**
 * @template T
 * @typedef {import("reshow-constant").SetStateAction<T>} SetStateAction
 */

/**
 * @param {SortableProps} props
 */
const useSortable = ({
  setSortData = (_p) => _p,
  fixedX,
  fixedY,
  autoSelect,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const comp = /**@type {React.MutableRefObject<HTMLElement>}*/ (useRef());
  const lastRange = /**@type {React.MutableRefObject<Range>}*/ (useRef());

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
        reverse = true;
      } else if (targetParentNode.lastChild?.isSameNode(targetEl)) {
        reverse = false;
      }
    }
    if (null == reverse) {
      reverse = (nextId === sortId || prevId === sortId) && near.bottom;
    }

    setSortData((prev) => ({
      ...prev,
      targetEl,
      targetId: getSortId(targetEl) || "",
      sortEl,
      sortId: sortId || "",
      reverseOrder: reverse,
    }));
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
      setIsDraging((prevIsDraging) => {
        if (true !== prevIsDraging) {
          setTimeout(() =>
            setSortData((prev) => ({
              ...prev,
              isDraging: true,
            }))
          );
          if (autoSelect) {
            if (null == lastRange.current) {
              lastRange.current = document.createRange();
            }
            lastRange.current.setStart(comp.current, 0);
            lastRange.current.setEnd(comp.current, 1);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(lastRange.current);
          }
          return true;
        } else {
          return prevIsDraging;
        }
      });
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
      setIsDraging((prevIsDraging) => {
        if (false !== prevIsDraging) {
          setTimeout(() =>
            setSortData((prev) => ({
              ...prev,
              isDraging: false,
            }))
          );
          return false;
        } else {
          return prevIsDraging;
        }
      });
      if (autoSelect) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
      }
    },
  };
  return { isDraging, handler, comp };
};

/**
 * @typedef {object} SortableProps
 * @property {SetStateAction<SortData>=} setSortData
 * @property {boolean=} fixedX
 * @property {boolean=} fixedY
 * @property {boolean=} autoSelect
 * @property {boolean=} builtInOnly
 * @property {boolean=} renderFirst
 * @property {React.ReactElement=} children
 * @property {React.CSSProperties=} style
 * @property {React.CSSProperties=} activeStyle
 * @property {React.CSSProperties=} activeFlotStyle
 * @property {import("organism-react-graph").DragAndDropStyle=} dragAndDropStyle
 */

export const Sort = (/**@type SortableProps*/ props) => {
  const { handler, isDraging, comp } = useSortable(props);
  const {
    autoSelect,
    fixedX,
    builtInOnly,
    renderFirst,
    children,
    setSortData,
    style: propsStyle,
    activeStyle: propsActiveStyle = { cursor: "grabbing" },
    activeFlotStyle: propsActiveFlotStyle = { cursor: "grabbing" },
    dragAndDropStyle,
    ...restProps
  } = props;

  const mergeStyle = (/**@type {React.CSSProperties=}*/ style) => {
    return {
      ...propsStyle,
      ...children?.props?.style,
      ...style,
    };
  };

  const item = build(
    build(children)({
      ...restProps,
      "data-sort-type": "sortable",
    })
  );

  const activeStyle = isDraging ? propsActiveStyle : undefined;
  const activeFlotStyle = isDraging ? propsActiveFlotStyle : undefined;

  const shadowEl = isDraging
    ? item({
        style: mergeStyle(activeStyle),
      })
    : null;
  const handleFloatRef = (/**@type HTMLElement*/ el) => (comp.current = el);
  const dragEl = item({
    style: mergeStyle(activeFlotStyle),
  });

  return (
    <>
      <DDWrapper
        refCb={handleFloatRef}
        onDrag={handler.drag}
        onDragEnd={handler.dragEnd}
        builtInOnly={builtInOnly}
        fixedX={fixedX}
        renderFirst={renderFirst}
        dragAndDropStyle={dragAndDropStyle}
      >
        {dragEl}
      </DDWrapper>
      {shadowEl}
    </>
  );
};

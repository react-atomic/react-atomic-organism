// @ts-check

import getOffset from "getoffset";
import isFixed from "./isFixed";
import isSetOverflow from "./isSetOverflow";
import { DomPositionInfoType, DomInfoType } from "./type";

/**
 * @param {HTMLElement} dom
 * @returns {DomPositionInfoType}
 */
const getDomPositionInfo = (dom) => {
  const fixedNode = isFixed(dom);
  const overflowNode = isSetOverflow(dom);
  const domScroller = /** @type HTMLElement */ (fixedNode || overflowNode);

  const domOverflowInfo = /** @type DomInfoType*/ (getOffset(dom, domScroller));
  domOverflowInfo.domScroller = domScroller;
  domOverflowInfo.fixedNode = domScroller;
  domOverflowInfo.overflowNode = domScroller;

  const domInfo = /** @type DomInfoType*/ (getOffset(dom));

  return {
    domInfo,
    domOverflowInfo,
    fixedNode,
    overflowNode,
  };
};

export default getDomPositionInfo;

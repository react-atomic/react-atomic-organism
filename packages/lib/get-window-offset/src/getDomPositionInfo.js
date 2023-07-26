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
  const scrollNode = isSetOverflow(dom);
  const domInfo = /** @type DomInfoType*/ (
    getOffset(dom, /** @type undefined|HTMLElement */ (fixedNode))
  );
  domInfo.scrollNode = scrollNode;
  domInfo.fixedNode = fixedNode;
  return {
    domInfo,
    fixedNode,
    scrollNode,
  };
};

export default getDomPositionInfo;

// @ts-check

import getOffset, { OffsetType } from "getoffset";
import isFixed from "./isFixed";
import isSetOverflow from "./isSetOverflow";

/**
 * @typedef {import("./MaybeHTMLElement").MaybeHTMLElement} MaybeHTMLElement
 */

export class DomInfoType extends OffsetType {
  /**
   * @type MaybeHTMLElement
   */
  scrollNode;
  /**
   * @type MaybeHTMLElement
   */
  fixedNode;
}

/**
 * @param {HTMLElement} dom
 * @returns {{domInfo: DomInfoType, fixedNode: MaybeHTMLElement, scrollNode: MaybeHTMLElement}}
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

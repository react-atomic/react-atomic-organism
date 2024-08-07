// @ts-check

import getStyle from "get-style";
import getScrollInfo from "get-scroll-info";

/**
 * @typedef {import("./types").MaybeHTMLElement} MaybeHTMLElement
 */

/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
const isSetOverflow = (node) => {
  if (!document.body.contains(node)) {
    console.warn(["Dom not exists in body", node]);
    return false;
  }
  if (!node.parentNode) {
    return false;
  }
  /**
   * @type {HTMLElement}
   */
  let thisParent = /**@type HTMLElement*/ (node.parentNode);
  while (thisParent.nodeName != "BODY") {
    if (thisParent.dataset.overflow) {
      return thisParent;
    }
    const overflowX = getStyle(thisParent, "overflow-x");
    const overflowY = getStyle(thisParent, "overflow-y");
    if ("visible" !== overflowY || "visible" !== overflowX) {
      const oScroll = getScrollInfo(thisParent);
      if (oScroll.top || oScroll.left) {
        return thisParent;
      }
    }
    thisParent = /**@type HTMLElement*/ (thisParent.parentNode);
  }
  return false;
};

export default isSetOverflow;

// @ts-check

import getStyle from "get-style";
import getScrollInfo from "get-scroll-info";

/**
 * @typedef {import("./type").MaybeHTMLElement} MaybeHTMLElement
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
   * @type any
   */
  let thisParent = node.parentNode;
  while (thisParent.nodeName != "BODY") {
    const overflowX = getStyle(thisParent, "overflow-x");
    const overflowY = getStyle(thisParent, "overflow-y");
    if ("visible" !== overflowY || "visible" !== overflowX) {
      const oScroll = getScrollInfo(thisParent);
      if (oScroll.top || oScroll.left) {
        return thisParent;
      }
    }
    thisParent = thisParent.parentNode;
  }
  return false;
};

export default isSetOverflow;

// @ts-check

import getStyle from "get-style";

/**
 * @typedef {import("./type").MaybeHTMLElement} MaybeHTMLElement 
 */

/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
const isFixed = (node) => {
  if (!document.body.contains(node)) {
    console.warn(["Dom not exists in body", node]);
    return false;
  }
  /**
   * @type any
   */
  let thisParent = node;
  while (thisParent.nodeName != "BODY") {
    const position = getStyle(thisParent, "position");
    if ("fixed" === position) {
      return thisParent;
    }
    thisParent = thisParent.parentNode;
  }
  return false;
};

export default isFixed;

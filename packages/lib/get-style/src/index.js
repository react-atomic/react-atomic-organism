// @ts-check

import { win, doc, hasWin } from "win-doc";

/**
 * @param {HTMLElement} el
 * @param {string} styleKey
 * @returns {undefined|string|number}
 */
const getStyle = (el, styleKey) => {
  if (!hasWin()) {
    return;
  }
  const oDoc = doc();
  const currentStyle = win()?.getComputedStyle(el, null);
  let styleValue = "";
  if (currentStyle) {
    styleValue = currentStyle[styleKey];
  } else if (oDoc.defaultView && oDoc.defaultView.getComputedStyle) {
    styleValue = oDoc.defaultView
      .getComputedStyle(el, null)
      .getPropertyValue(styleKey);
  }
  if (styleValue && styleValue.toLowerCase) {
    return styleValue.toLowerCase();
  } else {
    return styleValue;
  }
};

export default getStyle;

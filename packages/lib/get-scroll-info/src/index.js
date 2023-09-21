// @ts-check

import { doc, win } from "win-doc";
import { UNDEFINED, NEW_OBJ } from "reshow-constant";
import { getSN } from "get-random-id";

const lastScrollStore = NEW_OBJ();

/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */

/**
 * @typedef {object & Document} ThisDocument
 * @property {function} webkitIsFullScreen
 */

/**
 * @type ThisDocument
 */
let oDoc;
let oWin;
let isWebkit;
let docEl;

const initDoc = () => {
  oDoc = doc();
  oWin = win();
  isWebkit = UNDEFINED !== typeof oDoc.webkitIsFullScreen;
  docEl = oDoc.documentElement;
};

/**
 * @param {SAFE_UNDEFINED|HTMLElement} [el]
 * @returns {HTMLElement}
 */
const getScrollNode = (el) => {
  if (!oDoc) {
    initDoc();
  }
  if (!el && oDoc) {
    if (oDoc.scrollingElement) {
      el = oDoc.scrollingElement;
    } else if (isWebkit) {
      el = oDoc.body;
    } else {
      el = docEl;
    }
  }
  const htmlEl = /** @type {HTMLElement}*/ (el);
  if (!htmlEl.id) {
    htmlEl.id = getSN("scroll-info", "-");
  }
  return htmlEl;
};

export class ScrollInfoType {
  /**
   * @type number
   */
  top;
  /**
   * @type number
   */
  right;
  /**
   * @type number
   */
  bottom;
  /**
   * @type number
   */
  left;
  /**
   * @type number
   */
  scrollWidth;
  /**
   * @type number
   */
  scrollHeight;
  /**
   * @type number
   */
  scrollNodeWidth;
  /**
   * @type number
   */
  scrollNodeHeight;
  /**
   * @type boolean
   */
  atTop;
  /**
   * @type boolean
   */
  atRight;
  /**
   * @type boolean
   */
  atBottom;
  /**
   * @type boolean
   */
  atLeft;
  /**
   * @type boolean
   */
  isScrollUp;
  /**
   * @type boolean
   */
  isScrollRight;
  /**
   * @type boolean
   */
  isScrollDown;
  /**
   * @type boolean
   */
  isScrollLeft;
  /**
   * @type HTMLElement
   */
  scrollEl;
}

/**
 * @param {HTMLElement} [inputEl]
 * @returns {ScrollInfoType}
 */
const getScrollInfo = (inputEl, margin = 50) => {
  let w;
  let h;
  const el = getScrollNode(inputEl);
  const nodeName = (el.nodeName || "").toLowerCase();
  const isRoot = "body" === nodeName || "html" === nodeName;

  // defined scrollWidth and scrollHeight first.
  // to know if have vertical or horizontal bar.
  const scrollWidth = el.scrollWidth;
  const scrollHeight = el.scrollHeight;

  if (isRoot) {
    w = Math.max(el.clientWidth || 0, oWin.innerWidth || 0);
    h = Math.max(el.clientHeight || 0, oWin.innerHeight || 0);
    const hasHorizontalBar = w < scrollWidth;
    const hasVerticalBar = h < scrollHeight;
    if (hasHorizontalBar) {
      h = el.clientHeight;
    }
    if (hasVerticalBar) {
      w = el.clientWidth;
    }
  } else {
    w = el.scrollWidth ?? el.clientWidth;
    h = el.scrollHeight ?? el.clientHeight;
  }

  const scrollLeft = el.scrollLeft;
  const scrollTop = el.scrollTop;
  const scrollBottom = scrollTop + h;
  const scrollRight = scrollLeft + w;
  const elId = el.id;
  const lastScroll = lastScrollStore[elId];

  const info = {
    atTop: scrollTop < margin,
    atRight: scrollRight > scrollWidth - margin,
    atBottom: scrollBottom > scrollHeight - margin,
    atLeft: scrollLeft < margin,

    isScrollUp: lastScroll && scrollTop < lastScroll.top,
    isScrollRight: lastScroll && scrollLeft > lastScroll.left,
    isScrollDown: lastScroll && scrollTop > lastScroll.top,
    isScrollLeft: lastScroll && scrollLeft < lastScroll.left,

    scrollWidth,
    scrollHeight,
    scrollNodeWidth: w,
    scrollNodeHeight: h,

    top: scrollTop,
    right: scrollRight,
    bottom: scrollBottom,
    left: scrollLeft,

    scrollEl: el,
  };
  lastScrollStore[elId] = info;
  return info;
};

export default getScrollInfo;
export { getScrollNode };

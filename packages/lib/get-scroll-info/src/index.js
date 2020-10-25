import { doc, win } from "win-doc";
import { UNDEFINED } from "reshow-constant";

const lastScrollStore = {};
let oDoc;
let oWin;
let isWebkit;
let docEl;
let domCount = 0;

const initDoc = () => {
  oDoc = doc();
  oWin = win();
  isWebkit = UNDEFINED !== typeof oDoc.webkitIsFullScreen;
  docEl = oDoc.documentElement;
};

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
  if (!el.id) {
    el.id = "scroll-info-" + domCount;
    domCount++;
  }
  return el;
};

const getScrollInfo = (el, margin) => {
  el = getScrollNode(el);
  if (!margin) {
    margin = 50;
  }
  let w;
  let h;
  const nodeName = (el.nodeName || "").toLowerCase();
  const isRoot = "body" === nodeName || "html" === nodeName;
  if (isRoot) {
    w = Math.max(docEl.clientWidth || 0, oWin.innerWidth || 0);
    h = Math.max(docEl.clientHeight || 0, oWin.innerHeight || 0);
  } else {
    w = el.clientWidth;
    h = el.clientHeight;
  }
  const scrollLeft = el.scrollLeft;
  const scrollHeight = el.scrollHeight;
  const scrollTop = el.scrollTop;
  const scrollWidth = el.scrollWidth;
  const scrollBottom = scrollTop + h;
  const scrollRight = scrollLeft + w;
  const elId = el.id;
  const lastScroll = lastScrollStore[elId];

  const info = {
    atTop: scrollTop < margin,
    atRight: scrollRight > scrollWidth - margin,
    atBottom: scrollBottom > scrollHeight - margin,
    atLeft: scrollLeft < margin,

    isScrollDown: lastScroll && scrollTop > lastScroll.top,
    isScrollLeft: lastScroll && scrollLeft < lastScroll.left,
    isScrollRight: lastScroll && scrollLeft > lastScroll.left,
    isScrollUp: lastScroll && scrollTop < lastScroll.top,

    scrollWidth: scrollWidth,
    scrollHeight: scrollHeight,
    scrollNodeWidth: w,
    scrollNodeHeight: h,

    top: scrollTop,
    right: scrollRight,
    bottom: scrollBottom,
    left: scrollLeft,
  };
  lastScrollStore[elId] = info;
  return info;
};

export default getScrollInfo;
export { getScrollNode };

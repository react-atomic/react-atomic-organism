import { doc, win } from "win-doc";
import { UNDEFINED } from "reshow-constant";

const lastScrollStore = Object.create(null);
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
    w = el.clientWidth;
    h = el.clientHeight;
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

    isScrollDown: lastScroll && scrollTop > lastScroll.top,
    isScrollLeft: lastScroll && scrollLeft < lastScroll.left,
    isScrollRight: lastScroll && scrollLeft > lastScroll.left,
    isScrollUp: lastScroll && scrollTop < lastScroll.top,

    scrollWidth,
    scrollHeight,
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

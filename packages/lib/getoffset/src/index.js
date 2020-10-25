import getScrollInfo from "get-scroll-info";
import get from "get-object-value";
import { UNDEFINED } from "reshow-constant";

const unifyTouch = (e) =>
  e && e.changedTouches ? get(e, ["changedTouches", 0]) : e;

const mouse = (e, dom, scrollNode) => {
  if (!dom) {
    dom = e.currentTarget || e.target;
  }
  e = unifyTouch(e);
  const x = e.clientX;
  const y = e.clientY;
  const svgXY = toSvgXY(dom)(x, y);
  if (false !== svgXY) {
    const { x: svgX, y: svgY } = svgXY;
    return [svgX, svgY];
  } else {
    const domXY = getOffset(dom, scrollNode);
    return [x - domXY.left - dom.clientLeft, y - domXY.top - dom.clientTop];
  }
};

const toSvgXY = (dom, zoom) => (x, y) => {
  const svg = dom.ownerSVGElement || dom;
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    point = point.matrixTransform(dom.getScreenCTM().inverse());
    return getZoomXY(zoom)(point.x, point.y);
  } else {
    return false;
  }
};

const getSvgMatrixXY = (dom, zoom) => (x, y) => {
  const svg = dom.ownerSVGElement || dom;
  if (svg.getScreenCTM) {
    const { a, b, c, d, e, f } = dom.getScreenCTM();
    const { left, top } = svg.getBoundingClientRect();
    const svgX = a * x + c * y + e - left;
    const svgY = b * x + d * y + f - top;
    return getZoomXY(zoom)(svgX, svgY);
  }
};

const getZoomXY = (zoom) => (x, y) => {
  if (!zoom) {
    return { x, y };
  }
  const zoomK = get(zoom, ["k"], 1);
  const zoomX = get(zoom, ["x"], 0);
  const zoomY = get(zoom, ["y"], 0);
  const zx = (x - zoomX) / zoomK;
  const zy = (y - zoomY) / zoomK;
  return { x: zx, y: zy };
};

const getRectWithElOffset = (dom) => {
  let top = 0;
  let left = 0;
  let el = dom;
  do {
    const offsetTop = el.offsetTop || 0;
    const offsetLeft = el.offsetLeft || 0;
    if ("BODY" === el.nodeName) {
      top += offsetTop;
      left += offsetLeft;
    } else {
      top += offsetTop - el.scrollTop;
      left += offsetLeft - el.scrollLeft;
    }
    el = el.offsetParent;
  } while (el);
  return { top, left };
};

const getOffset = (dom, scrollNode) => {
  let top = 0;
  let left = 0;
  let w;
  let h;
  let rect;
  const scrollInfo =
    0 === scrollNode ? { top: 0, left: 0 } : getScrollInfo(scrollNode);
  if (UNDEFINED !== typeof SVGElement && dom instanceof SVGElement) {
    rect = dom.getBoundingClientRect();
    top = rect.top + scrollInfo.top;
    left = rect.left + scrollInfo.left;
    w = rect.width;
    h = rect.height;
  } else {
    w = dom.offsetWidth;
    h = dom.offsetHeight;
    if (dom.getBoundingClientRect) {
      rect = dom.getBoundingClientRect();
      top = parseInt(rect.top + scrollInfo.top, 10);
      left = parseInt(rect.left + scrollInfo.left, 10);
    } else {
      const rectOffset = getRectWithElOffset(dom);
      top = rectOffset.top;
      left = rectOffset.left;
    }
  }
  const result = {
    w,
    h,
    width: w,
    height: h,
    top,
    right: left + w,
    bottom: top + h,
    left,
    rect,
  };
  return result;
};

export { mouse, toSvgXY, getSvgMatrixXY, unifyTouch };
export default getOffset;

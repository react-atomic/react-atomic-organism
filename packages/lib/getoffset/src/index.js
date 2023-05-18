//@ts-check
import getScrollInfo from "get-scroll-info";

import get from "get-object-value";
import { UNDEFINED, OBJ_SIZE } from "reshow-constant";

/**
 * @typedef {object} Coordinate
 * @property {number} [x]
 * @property {number} [y]
 */

/**
 * @param {object} e
 */
const unifyTouch = (e) =>
  e && e.changedTouches ? get(e, ["changedTouches", 0]) : e;

/**
 * @param {object} e
 * @param {HTMLElement} dom
 * @param {HTMLElement} scrollNode
 * @returns {[number, number]}
 */
const mouse = (e, dom, scrollNode) => {
  if (!dom) {
    dom = e.currentTarget || e.target;
  }
  e = unifyTouch(e);
  const x = e.clientX;
  const y = e.clientY;
  const svgXY = toSvgXY(dom)(x, y);
  if (OBJ_SIZE(svgXY)) {
    const { x: svgX, y: svgY } = svgXY;
    return [/** @type {number}*/ (svgX), /** @type {number}*/ (svgY)];
  } else {
    const domXY = /** @type {OffsetType} */(getOffset(dom, scrollNode));
    /**
     * dom.clientLeft
     *
     * https://www.w3schools.com/jsref/prop_element_clientleft.asp
     */
    return [x - domXY.left - dom.clientLeft, y - domXY.top - dom.clientTop];
  }
};

/**
 * @param {object} dom
 * @param {object} [zoom]
 */
const toSvgXY =
  (dom, zoom) =>
  /**
   * @param {number} x
   * @param {number} y
   * @returns {Coordinate}
   */
  (x, y) => {
    const svg = dom.ownerSVGElement || dom;
    if (svg.createSVGPoint) {
      let point = svg.createSVGPoint();
      point.x = x;
      point.y = y;
      point = point.matrixTransform(dom.getScreenCTM().inverse());
      return getZoomXY(zoom)(point.x, point.y);
    } else {
      return {};
    }
  };

/**
 * @param {object} dom
 * @param {object} zoom
 */
const getSvgMatrixXY =
  (dom, zoom) =>
  /**
   * @param {number} x
   * @param {number} y
   * @returns {Coordinate|undefined}
   */
  (x, y) => {
    const svg = dom.ownerSVGElement || dom;
    if (svg.getScreenCTM) {
      const { a, b, c, d, e, f } = dom.getScreenCTM();
      const { left, top } = svg.getBoundingClientRect();
      const svgX = a * x + c * y + e - left;
      const svgY = b * x + d * y + f - top;
      return getZoomXY(zoom)(svgX, svgY);
    }
  };

/**
 * @param {object} zoom
 */
const getZoomXY =
  (zoom) =>
  /**
   * @param {number} x
   * @param {number} y
   * @returns {Coordinate}
   */
  (x, y) => {
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

/**
 * @param {object} dom
 * @returns {Coordinate}
 */
const getRectWithElOffset = (dom) => {
  let x = 0;
  let y = 0;
  let el = dom;
  do {
    const offsetTop = el.offsetTop || 0;
    const offsetLeft = el.offsetLeft || 0;
    if ("BODY" === el.nodeName) {
      x += offsetLeft;
      y += offsetTop;
    } else {
      x += offsetLeft - el.scrollLeft;
      y += offsetTop - el.scrollTop;
    }
    el = el.offsetParent;
  } while (el);
  return { x, y };
};

/**
 * @typedef {import("get-scroll-info").ScrollInfoType} ScrollInfoType
 */

/**
 * @typedef {object} OffsetType
 * @property {object} rect
 * @property {ScrollInfoType} scrollInfo
 * @property {number} w
 * @property {number} h
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 */

/**
 * @param {HTMLElement} dom
 * @param {HTMLElement|number} [scrollNode]
 * @returns {OffsetType|undefined}
 */
const getOffset = (dom, scrollNode) => {
  if (!dom) {
    return;
  }
  let top = 0;
  let left = 0;
  let w;
  let h;
  let rect;
  /**
   * @type {ScrollInfoType}
   */
  const scrollInfo =
    0 === scrollNode ? { top: 0, left: 0 } : getScrollInfo(/** @type {HTMLElement}*/(scrollNode));
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
      top = (rect.top + scrollInfo.top) * 1;
      left = (rect.left + scrollInfo.left) * 1;
    } else {
      const rectOffset = getRectWithElOffset(dom);
      top = /** @type {number} */ (rectOffset.y);
      left = /** @type {number} */ (rectOffset.x);
    }
  }
  const result = {
    rect,
    scrollInfo,
    w,
    h,
    width: w,
    height: h,
    x: left,
    y: top,
    top,
    right: left + w,
    bottom: top + h,
    left,
  };
  return result;
};

export { mouse, toSvgXY, getSvgMatrixXY, unifyTouch };
export default getOffset;

// @ts-check

import getDomPositionInfo from "./getDomPositionInfo";
import { Coordinate, NearLocType } from "./types";

/**
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @returns {Coordinate}
 */
const calDomCenter = (left, top, width, height) => {
  const xy = {
    x: left + Math.floor(width / 2),
    y: top + Math.floor(height / 2),
  };
  return xy;
};

/**
 * @param {HTMLElement} dom
 * @returns {Coordinate}
 */
export const getDomCenter = (dom) => {
  const { left, top, width, height } = getDomPositionInfo(dom)?.domInfo || {};
  const domCenter = calDomCenter(left, top, width, height);
  return domCenter;
};

/**
 * @param {Coordinate} center
 * @param {Coordinate} floatXY
 * @returns {NearLocType}
 */
export const getNearLocation = (center, floatXY) => {
  const loc = {
    center: false,
    centerCenter: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  if (floatXY.x > center.x) {
    loc.right = true;
  } else if (floatXY.x < center.x) {
    loc.left = true;
  } else {
    loc.center = true;
  }
  if (floatXY.y > center.y) {
    loc.bottom = true;
  } else if (floatXY.y < center.y) {
    loc.top = true;
  } else {
    loc.center = true;
  }
  if (loc.center) {
    if (!loc.top && !loc.bottom && !loc.left && !loc.right) {
      loc.centerCenter = true;
    }
  }
  return loc;
};

/**
 * @typedef {object} NearWhereConfig
 * @property {boolean=} compareCenter
 * @property {Coordinate=} adjustXY
 */

/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement|Coordinate} floatElOrFloatXY
 * @param {NearWhereConfig=} nearWhereConfig
 * @returns {NearLocType}
 */
export default function nearWhere(
  targetEl,
  floatElOrFloatXY,
  nearWhereConfig = {}
) {
  const { compareCenter, adjustXY } = nearWhereConfig;
  const tarCenter = getDomCenter(targetEl);
  let floatXY;
  const floatEl = /**@type HTMLElement*/ (floatElOrFloatXY);
  if (floatEl.nodeName) {
    if (compareCenter) {
      floatXY = getDomCenter(floatEl);
    } else {
      const floatElInfo = getDomPositionInfo(floatEl)?.domInfo;
      if (null != floatElInfo) {
        floatXY = { x: floatElInfo.left, y: floatElInfo.top };
      }
    }
  }
  if (null == floatXY) {
    floatXY = /**@type Coordinate*/ (floatElOrFloatXY);
  }
  if (null != adjustXY) {
    floatXY = { x: floatXY.x + adjustXY.x, y: floatXY.y + adjustXY.y };
  }
  return getNearLocation(tarCenter, floatXY);
}

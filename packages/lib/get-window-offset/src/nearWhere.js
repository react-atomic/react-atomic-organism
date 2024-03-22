// @ts-check

import getDomPositionInfo from "./getDomPositionInfo";
import { Coordinate, NearLocType } from "./type";

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
 * @param {Coordinate} floatInfo
 * @returns {NearLocType}
 */
export const getNearLocation = (center, floatInfo) => {
  const loc = {
    center: false,
    centerCenter: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  if (floatInfo.x > center.x) {
    loc.right = true;
  } else if (floatInfo.x < center.x) {
    loc.left = true;
  } else {
    loc.center = true;
  }
  if (floatInfo.y > center.y) {
    loc.bottom = true;
  } else if (floatInfo.y < center.y) {
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
 * @param {HTMLElement} targetEl
 * @param {HTMLElement|Coordinate} floatElOrFloatXY
 * @param {boolean=} compareCenter
 * @returns {NearLocType}
 */
export default function nearWhere(targetEl, floatElOrFloatXY, compareCenter) {
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
  return getNearLocation(tarCenter, floatXY);
}

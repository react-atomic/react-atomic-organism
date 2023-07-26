// @ts-check
import getDomPositionInfo from "./getDomPositionInfo";

/**
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @returns {[number, number]}
 */
const calDomCenter = (left, top, width, height) => {
  /**
   * @type [number, number]
   */
  const xy = [left + Math.floor(width / 2), top + Math.floor(height / 2)];
  return xy;
};

/**
 * @param {HTMLElement} dom
 * @returns {[number, number]}
 */
const getDomCenter = (dom) => {
  const { left, top, width, height } = getDomPositionInfo(dom)?.domInfo || {};
  const domCenter = calDomCenter(left, top, width, height);
  return domCenter;
};

export default getDomCenter;

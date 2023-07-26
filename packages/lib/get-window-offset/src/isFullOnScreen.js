// @ts-check

import { SimplePosType } from "./type";

/**
 * @param {SimplePosType} domInfo
 * @param {SimplePosType} scrollInfo 
 * @returns {boolean}
 */
const isFullOnScreen = (domInfo, scrollInfo) => {
  const bool =
    domInfo.top > scrollInfo.top &&
    domInfo.right < scrollInfo.right &&
    domInfo.bottom < scrollInfo.bottom &&
    domInfo.left > scrollInfo.left;
  return bool;
};

export default isFullOnScreen;

//@ts-check

import { ScrollInfoType } from "get-scroll-info";
import { DomInfoType } from "./type";

/**
 * @typedef {object} IsOnScreenExtraType
 * @property {boolean} isOnScreen
 */

/**
 * @typedef {IsOnScreenExtraType & ScrollInfoType & DomInfoType} IsOnScreenType
 */

/**
 * @param {DomInfoType} domInfo
 * @param {ScrollInfoType} scrollInfo
 * @returns {IsOnScreenType}
 */
const isOnScreen = (domInfo, scrollInfo, margin = 0) => {
  /**
   * @type any 
   */
  const nextDomInfo = {...domInfo};
  nextDomInfo.atTop = domInfo.bottom <= scrollInfo.top + margin;
  nextDomInfo.atRight = domInfo.left >= scrollInfo.right - margin;
  nextDomInfo.atBottom = domInfo.top >= scrollInfo.bottom - margin;
  nextDomInfo.atLeft = domInfo.right <= scrollInfo.left + margin;
  nextDomInfo.isOnScreen = !(
    nextDomInfo.atTop ||
    nextDomInfo.atRight ||
    nextDomInfo.atBottom ||
    nextDomInfo.atLeft
  );
  return nextDomInfo;
};

export default isOnScreen;

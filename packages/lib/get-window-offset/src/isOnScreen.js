//@ts-check

import { ScrollInfoType } from "get-scroll-info";
import { DomInfoType, IsOnScreenType } from "./types";

/**
 * @param {DomInfoType} domInfo
 * @param {ScrollInfoType} scrollInfo
 * @returns {IsOnScreenType}
 */
const isOnScreen = (domInfo, scrollInfo, margin = 0) => {
  /**
   * @type IsOnScreenType
   */
  const nextDomInfo = {
    ...domInfo,
    atTop: domInfo.bottom <= scrollInfo.top + margin,
    atRight: domInfo.left >= scrollInfo.right - margin,
    atBottom: domInfo.top >= scrollInfo.bottom - margin,
    atLeft: domInfo.right <= scrollInfo.left + margin,
    isOnScreen: false,
    scrollInfo,
    margin,
  };
  nextDomInfo.isOnScreen = !(
    nextDomInfo.atTop ||
    nextDomInfo.atRight ||
    nextDomInfo.atBottom ||
    nextDomInfo.atLeft
  );
  return nextDomInfo;
};

export default isOnScreen;

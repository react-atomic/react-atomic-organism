export default isOnScreen;
/**
 * @param {DomInfoType} domInfo
 * @param {ScrollInfoType} scrollInfo
 * @returns {IsOnScreenType}
 */
declare function isOnScreen(domInfo: DomInfoType, scrollInfo: ScrollInfoType, margin?: number): IsOnScreenType;
import { DomInfoType } from "./type";
import { ScrollInfoType } from "get-scroll-info";
import { IsOnScreenType } from "./type";

import { ScrollInfoType } from "get-scroll-info";
import { DomInfoType, IsOnScreenType } from "./types";
/**
 * @param {DomInfoType} domInfo
 * @param {ScrollInfoType} scrollInfo
 * @returns {IsOnScreenType}
 */
declare const isOnScreen: (domInfo: DomInfoType, scrollInfo: ScrollInfoType, margin?: number) => IsOnScreenType;
export default isOnScreen;

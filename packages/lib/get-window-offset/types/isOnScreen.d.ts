export default isOnScreen;
export type IsOnScreenExtraType = {
    isOnScreen: boolean;
};
export type IsOnScreenType = IsOnScreenExtraType & ScrollInfoType & DomInfoType;
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
declare function isOnScreen(domInfo: DomInfoType, scrollInfo: ScrollInfoType, margin?: number): IsOnScreenType;
import { ScrollInfoType } from "get-scroll-info";
import { DomInfoType } from "./type";

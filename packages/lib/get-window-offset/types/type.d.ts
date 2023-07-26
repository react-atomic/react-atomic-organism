/**
 * @typedef {undefined|boolean|HTMLElement} MaybeHTMLElement
 */
/**
 * @typedef {import('./isOnScreen').IsOnScreenType} IsOnScreenType
 */
export class SimplePosType {
    /**
     * @type number
     */
    top: number;
    /**
     * @type number
     */
    right: number;
    /**
     * @type number
     */
    bottom: number;
    /**
     * @type number
     */
    left: number;
}
export class DomInfoType extends OffsetType {
    /**
     * @type MaybeHTMLElement
     */
    scrollNode: MaybeHTMLElement;
    /**
     * @type MaybeHTMLElement
     */
    fixedNode: MaybeHTMLElement;
    /**
     * @type boolean
     */
    isOnScreen: boolean;
}
export class DomPositionInfoType {
    /**
     * @type DomInfoType
     */
    domInfo: DomInfoType;
    /**
     * @type MaybeHTMLElement
     */
    fixedNode: MaybeHTMLElement;
    /**
     * @type MaybeHTMLElement
     */
    scrollNode: MaybeHTMLElement;
}
export class CalWindowOffsetResult {
    /**
     * @type string[]
     */
    locs: string[];
    /**
     * @type string
     */
    firstKey: string;
    /**
     * @type string
     */
    secondKey: string;
}
export class WindowOffsetType extends CalWindowOffsetResult {
    /**
     * @type {IsOnScreenType}
     */
    domInfo: IsOnScreenType;
    /**
     * @type {ScrollInfoType}
     */
    scrollInfo: ScrollInfoType;
}
export type MaybeHTMLElement = undefined | boolean | HTMLElement;
export type IsOnScreenType = import('./isOnScreen').IsOnScreenType;
import { OffsetType } from "getoffset";
import { ScrollInfoType } from "get-scroll-info";

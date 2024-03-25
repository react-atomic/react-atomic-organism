/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */
/**
 * @typedef {SAFE_UNDEFINED|HTMLElement} MaybeHTMLElement
 */
export class NearLocType {
    /**
     * @type boolean
     */
    center: boolean;
    /**
     * @type boolean
     */
    centerCenter: boolean;
    /**
     * @type boolean
     */
    top: boolean;
    /**
     * @type boolean
     */
    bottom: boolean;
    /**
     * @type boolean
     */
    left: boolean;
    /**
     * @type boolean
     */
    right: boolean;
}
export class Coordinate {
    /**
     * @type number
     */
    x: number;
    /**
     * @type number
     */
    y: number;
}
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
    domScroller: MaybeHTMLElement;
    /**
     * @type MaybeHTMLElement
     */
    fixedNode: MaybeHTMLElement;
    /**
     * @type MaybeHTMLElement
     */
    overflowNode: MaybeHTMLElement;
}
export class IsOnScreenType extends DomInfoType {
    /**
     * @type boolean
     */
    isOnScreen: boolean;
    /**
     * @type boolean
     */
    atTop: boolean;
    /**
     * @type boolean
     */
    atRight: boolean;
    /**
     * @type boolean
     */
    atBottom: boolean;
    /**
     * @type boolean
     */
    atLeft: boolean;
    /**
     * @type number
     */
    margin: number;
}
export class DomPositionInfoType {
    /**
     * @type DomInfoType
     */
    domOverflowInfo: DomInfoType;
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
    overflowNode: MaybeHTMLElement;
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
     * @type {?IsOnScreenType}
     */
    domOverflowInfo: IsOnScreenType | null;
    /**
     * @type IsOnScreenType
     */
    domInfo: IsOnScreenType;
    /**
     * @type ScrollInfoType
     */
    scrollInfo: ScrollInfoType;
}
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
export type MaybeHTMLElement = SAFE_UNDEFINED | HTMLElement;
import { OffsetType } from "getoffset";
import { ScrollInfoType } from "get-scroll-info";

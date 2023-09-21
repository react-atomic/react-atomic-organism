// @ts-check
import { OffsetType } from "getoffset";
import { ScrollInfoType } from "get-scroll-info";

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
  center;
  /**
   * @type boolean
   */
  centerCenter;
  /**
   * @type boolean
   */
  top;
  /**
   * @type boolean
   */
  bottom;
  /**
   * @type boolean
   */
  left;
  /**
   * @type boolean
   */
  right;
}

export class Coordinate {
  /**
   * @type number
   */
  x;
  /**
   * @type number
   */
  y;
}

export class SimplePosType {
  /**
   * @type number
   */
  top;
  /**
   * @type number
   */
  right;
  /**
   * @type number
   */
  bottom;
  /**
   * @type number
   */
  left;
}

export class DomInfoType extends OffsetType {
  /**
   * @type MaybeHTMLElement
   */
  domScroller;
  /**
   * @type MaybeHTMLElement
   */
  fixedNode;
  /**
   * @type MaybeHTMLElement
   */
  overflowNode;
}

export class IsOnScreenType extends DomInfoType {
  /**
   * @type boolean
   */
  isOnScreen;
  /**
   * @type boolean
   */
  atTop;
  /**
   * @type boolean
   */
  atRight;
  /**
   * @type boolean
   */
  atBottom;
  /**
   * @type boolean
   */
  atLeft;
  /**
   * @type boolean
   */
}

export class DomPositionInfoType {
  /**
   * @type DomInfoType
   */
  domOverflowInfo;
  /**
   * @type DomInfoType
   */
  domInfo;
  /**
   * @type MaybeHTMLElement
   */
  fixedNode;
  /**
   * @type MaybeHTMLElement
   */
  overflowNode;
}

export class CalWindowOffsetResult {
  /**
   * @type string[]
   */
  locs;
  /**
   * @type string
   */
  firstKey;
  /**
   * @type string
   */
  secondKey;
}

export class WindowOffsetType extends CalWindowOffsetResult {
  /**
   * @type IsOnScreenType
   */
  domOverflowInfo;
  /**
   * @type IsOnScreenType
   */
  domInfo;
  /**
   * @type ScrollInfoType
   */
  scrollInfo;
}

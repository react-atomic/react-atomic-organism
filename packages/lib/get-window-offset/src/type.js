// @ts-check
import { OffsetType } from "getoffset";
import { ScrollInfoType } from "get-scroll-info";

/**
 * @typedef {undefined|false|HTMLElement} MaybeHTMLElement
 */
/**
 * @typedef {import('./isOnScreen').IsOnScreenType} IsOnScreenType
 */

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
  scrollNode;
  /**
   * @type MaybeHTMLElement
   */
  fixedNode;
  /**
   * @type boolean
   */
  isOnScreen;
}

export class DomPositionInfoType {
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
  scrollNode;
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
   * @type {IsOnScreenType}
   */
  domInfo;
  /**
   * @type {ScrollInfoType}
   */
  scrollInfo;
}

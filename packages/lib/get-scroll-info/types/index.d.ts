export class ScrollInfoType {
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
    /**
     * @type number
     */
    scrollWidth: number;
    /**
     * @type number
     */
    scrollHeight: number;
    /**
     * @type number
     */
    scrollNodeWidth: number;
    /**
     * @type number
     */
    scrollNodeHeight: number;
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
     * @type boolean
     */
    isScrollUp: boolean;
    /**
     * @type boolean
     */
    isScrollRight: boolean;
    /**
     * @type boolean
     */
    isScrollDown: boolean;
    /**
     * @type boolean
     */
    isScrollLeft: boolean;
    /**
     * @type HTMLElement
     */
    scrollEl: HTMLElement;
}
export default getScrollInfo;
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
export type ThisDocument = object & Document;
/**
 * @param {SAFE_UNDEFINED|HTMLElement} [inputEl]
 * @returns {ScrollInfoType}
 */
declare function getScrollInfo(inputEl?: SAFE_UNDEFINED | HTMLElement, margin?: number): ScrollInfoType;
/**
 * @param {SAFE_UNDEFINED|HTMLElement} [el]
 * @returns {HTMLElement}
 */
export function getScrollNode(el?: SAFE_UNDEFINED | HTMLElement): HTMLElement;

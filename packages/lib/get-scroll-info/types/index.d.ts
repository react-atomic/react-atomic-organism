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
}
export default getScrollInfo;
export type ThisDocument = object & Document;
/**
 * @param {HTMLElement} [el]
 * @returns {ScrollInfoType}
 */
declare function getScrollInfo(el?: HTMLElement, margin?: number): ScrollInfoType;
/**
 * @param {HTMLElement} [el]
 * @returns {HTMLElement}
 */
export function getScrollNode(el?: HTMLElement): HTMLElement;

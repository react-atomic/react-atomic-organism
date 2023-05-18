export default getScrollInfo;
export type ThisDocument = object & Document;
export type ScrollInfoType = {
    top: number;
    left: number;
    atTop?: boolean;
    atRight?: boolean;
    atBottom?: boolean;
    atLeft?: boolean;
    isScrollUp?: boolean;
    isScrollRight?: boolean;
    isScrollDown?: boolean;
    isScrollLeft?: boolean;
    scrollWidth?: number;
    scrollHeight?: number;
    scrollNodeWidth?: number;
    scrollNodeHeight?: number;
    right?: number;
    bottom?: number;
};
/**
 * @typedef {object} ScrollInfoType
 * @property {number} top
 * @property {number} left
 * @property {boolean} [atTop]
 * @property {boolean} [atRight]
 * @property {boolean} [atBottom]
 * @property {boolean} [atLeft]
 * @property {boolean} [isScrollUp]
 * @property {boolean} [isScrollRight]
 * @property {boolean} [isScrollDown]
 * @property {boolean} [isScrollLeft]
 * @property {number} [scrollWidth]
 * @property {number} [scrollHeight]
 * @property {number} [scrollNodeWidth]
 * @property {number} [scrollNodeHeight]
 * @property {number} [right]
 * @property {number} [bottom]
 */
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

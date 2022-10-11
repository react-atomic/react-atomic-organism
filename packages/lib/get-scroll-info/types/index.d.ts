export default getScrollInfo;
export type ThisDocument = object & Document;
export type InfoType = {
    atTop: boolean;
    atRight: boolean;
    atBottom: boolean;
    atLeft: boolean;
    isScrollUp: boolean;
    isScrollRight: boolean;
    isScrollDown: boolean;
    isScrollLeft: boolean;
    scrollWidth: number;
    scrollHeight: number;
    scrollNodeWidth: number;
    scrollNodeHeight: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
};
/**
 * @typedef {object} InfoType
 * @property {boolean} atTop
 * @property {boolean} atRight
 * @property {boolean} atBottom
 * @property {boolean} atLeft
 * @property {boolean} isScrollUp
 * @property {boolean} isScrollRight
 * @property {boolean} isScrollDown
 * @property {boolean} isScrollLeft
 * @property {number} scrollWidth
 * @property {number} scrollHeight
 * @property {number} scrollNodeWidth
 * @property {number} scrollNodeHeight
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 */
/**
 * @returns {InfoType}
 */
declare function getScrollInfo(el?: any, margin?: number): InfoType;
/**
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 */
export function getScrollNode(el: HTMLElement): HTMLElement;

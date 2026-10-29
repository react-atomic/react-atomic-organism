declare class Coordinate {
    /**
     * @type number
     */
    x: number;
    /**
     * @type number
     */
    y: number;
}
/**
 * @param {any} e
 */
declare const unifyTouch: (e: any) => any;
/**
 * @param {any} e
 * @param {HTMLElement} dom
 * @param {HTMLElement} scrollNode
 * @returns {[number, number]}
 */
declare const mouse: (e: any, dom: HTMLElement, scrollNode: HTMLElement) => [number, number];
/**
 * @param {any} dom
 * @param {any} [zoom]
 */
declare const toSvgXY: (dom: any, zoom?: any) => (x: number, y: number) => Coordinate | undefined;
/**
 * @param {any} dom
 * @param {any} zoom
 */
declare const getSvgMatrixXY: (dom: any, zoom: any) => (x: number, y: number) => Coordinate | undefined;
export type ScrollInfoType = import("get-scroll-info").ScrollInfoType;
/**
 * @typedef {import("get-scroll-info").ScrollInfoType} ScrollInfoType
 */
export declare class SimpleScrollInfoType {
    /**
     * @type {number}
     */
    top: number;
    /**
     * @type {number}
     */
    left: number;
}
export declare class OffsetType {
    /**
     * @type DOMRect
     */
    rect: DOMRect;
    /**
     * @type ScrollInfoType|SimpleScrollInfoType
     */
    scrollInfo: ScrollInfoType | SimpleScrollInfoType;
    /**
     * @type number
     */
    w: number;
    /**
     * @type number
     */
    h: number;
    /**
     * @type number
     */
    width: number;
    /**
     * @type number
     */
    height: number;
    /**
     * @type number
     */
    x: number;
    /**
     * @type number
     */
    y: number;
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
/**
 * @param {HTMLElement} dom
 * @param {HTMLElement|import('reshow-constant').SAFE_UNDEFINED} [scrollNode]
 * @returns {OffsetType|undefined}
 */
declare const getOffset: (dom: HTMLElement, scrollNode?: HTMLElement | import('reshow-constant').SAFE_UNDEFINED) => OffsetType | undefined;
export { mouse, toSvgXY, getSvgMatrixXY, unifyTouch };
export default getOffset;

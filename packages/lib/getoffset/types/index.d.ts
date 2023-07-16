/**
 * @typedef {import("get-scroll-info").ScrollInfoType} ScrollInfoType
 */
export class SimpleScrollInfoType {
    /**
     * @type {number}
     */
    top: number;
    /**
     * @type {number}
     */
    left: number;
}
export class OffsetType {
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
export default getOffset;
export type ScrollInfoType = import("get-scroll-info").ScrollInfoType;
/**
 * @param {object} e
 * @param {HTMLElement} dom
 * @param {HTMLElement} scrollNode
 * @returns {[number, number]}
 */
export function mouse(e: object, dom: HTMLElement, scrollNode: HTMLElement): [number, number];
/**
 * @param {object} dom
 * @param {object} [zoom]
 */
export function toSvgXY(dom: object, zoom?: object): (x: number, y: number) => Coordinate | undefined;
/**
 * @param {object} dom
 * @param {object} zoom
 */
export function getSvgMatrixXY(dom: object, zoom: object): (x: number, y: number) => Coordinate | undefined;
/**
 * @param {object} e
 */
export function unifyTouch(e: object): any;
/**
 * @param {HTMLElement} dom
 * @param {HTMLElement|number} [scrollNode]
 * @returns {OffsetType|undefined}
 */
declare function getOffset(dom: HTMLElement, scrollNode?: HTMLElement | number): OffsetType | undefined;
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

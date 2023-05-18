export default getOffset;
export type Coordinate = {
    x?: number;
    y?: number;
};
export type ScrollInfoType = import("get-scroll-info").ScrollInfoType;
export type OffsetType = {
    rect: object;
    scrollInfo: ScrollInfoType;
    w: number;
    h: number;
    width: number;
    height: number;
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
};
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
export function toSvgXY(dom: object, zoom?: object): (x: number, y: number) => Coordinate;
/**
 * @param {object} dom
 * @param {object} zoom
 */
export function getSvgMatrixXY(dom: object, zoom: object): (x: number, y: number) => Coordinate | undefined;
/**
 * @typedef {object} Coordinate
 * @property {number} [x]
 * @property {number} [y]
 */
/**
 * @param {object} e
 */
export function unifyTouch(e: object): any;
/**
 * @typedef {import("get-scroll-info").ScrollInfoType} ScrollInfoType
 */
/**
 * @typedef {object} OffsetType
 * @property {object} rect
 * @property {ScrollInfoType} scrollInfo
 * @property {number} w
 * @property {number} h
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 */
/**
 * @param {HTMLElement} dom
 * @param {HTMLElement|number} [scrollNode]
 * @returns {OffsetType|undefined}
 */
declare function getOffset(dom: HTMLElement, scrollNode?: HTMLElement | number): OffsetType | undefined;

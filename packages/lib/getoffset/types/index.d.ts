export default getOffset;
export type Coordinate = {
    x?: number;
    y?: number;
};
export type Offset = {
    rect: object;
    scrollInfo: object;
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
 * @param {object} zoom
 */
export function toSvgXY(dom: object, zoom: object): (x: number, y: number) => Coordinate;
/**
 * @param {object} dom
 * @param {object} zoom
 */
export function getSvgMatrixXY(dom: object, zoom: object): (x: number, y: number) => Coordinate;
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
 * @typedef {object} Offset
 * @property {object} rect
 * @property {object} scrollInfo
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
 * @param {HTMLElement|number} scrollNode
 * @returns {Offset}
 */
declare function getOffset(dom: HTMLElement, scrollNode?: HTMLElement | number): Offset;

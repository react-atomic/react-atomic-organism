export type Curve = any;
export type D3ScaleLinear = import("d3-scale").ScaleLinear<any, any, never>;
export const line: import("memoize-one").MemoizedFn<(start: Coordinate, end: Coordinate, curve: Curve, xLocator?: (d: Coordinate) => number, yLocator?: (d: Coordinate) => number) => {
    center: any;
    d: any;
}>;
/**
 * @param {any} data
 * @param {Scaler} xScale
 * @param {Scaler} yScale
 */
export function curve(data: any, xScale: Scaler, yScale: Scaler, xLocator?: (d: Coordinate) => number, yLocator?: (d: Coordinate) => number): any;
export const hArea: import("memoize-one").MemoizedFn<(data: any, curve: Curve, { y0Locator, y1Locator, xLocator, }?: {
    y0Locator?: (d: any) => any;
    y1Locator?: (d: any) => any;
    xLocator?: (d: Coordinate) => number;
}) => any>;
/**
 * @see https://github.com/d3/d3-shape/blob/master/README.md#pies
 * @param {any} data
 * @param {number} inner
 * @param {number} outer
 */
export function pie(data: any, inner: number, outer: number, valueLocator?: (/**@type any*/ d: any) => any): {
    outerRadius: number;
    innerRadius: number;
    items: any;
};
/**
 * @see https://d3js.org/d3-shape/arc#arc
 * @param {any} data
 * @param {number} inner
 * @param {number} outer
 * @param {number=} cornerRadius
 */
export function arc(data: any, inner: number, outer: number, cornerRadius?: number | undefined): {
    outerRadius: number;
    innerRadius: number;
    items: any;
};
/**
 * @param {any} data
 * @param {any[]} keyList
 */
export function stack(data: any, keyList: any[]): any;
export function colors(scheme?: string): any;
/**
 * @param {any} data
 * @param {number} start
 * @param {number} end
 */
export function scaleBand(data: any, start: number, end: number, labelLocator?: (/**@type any*/ d: any) => any, tickNum?: number): {
    scaler: any;
    list: {};
    length: any;
};
/**
 * Numeric label
 * @see https://d3js.org/d3-scale/linear#scaleLinear
 * @param {any} data
 * @param {number} start
 * @param {number} end
 * @param {?Function=} labelLocator
 * @param {?number=} tickNum
 * @param {?number[]=} more
 */
export function scaleLinear(data: any, start: number, end: number, labelLocator?: (Function | null) | undefined, tickNum?: (number | null) | undefined, more?: (number[] | null) | undefined): {
    scaler: any;
    list: {};
};
/**
 * Events, DnD, Zoom
 */
export function d3DnD({ el, container, touchable, start, end, drag, subject }: {
    el: any;
    container: any;
    touchable: any;
    start: any;
    end: any;
    drag: any;
    subject: any;
}): void;
export function d3Zoom({ el, scaleExtent, callback }: {
    el: any;
    scaleExtent: any;
    callback: any;
}): any;
/**
 * @param {any} el
 */
export function getZoom(el: any): any;
/**
 * @param {any} el
 */
export function d3Select(el: any): any;
/**
 * @param {Coordinate[]} points
 * @param {Function} xLocator
 * @param {Function} yLocator
 * @returns {Coordinate}
 */
export function getPointsCenter(points: Coordinate[], xLocator?: Function, yLocator?: Function): Coordinate;
export function toZoomTransform({ x, y, k }: {
    x: any;
    y: any;
    k: any;
}): any;
declare class Coordinate {
    /**
     * @type {number}
     */
    x: number;
    /**
     * @type {number}
     */
    y: number;
}
/**
 * @typedef {import("d3").curveBasis} Curve
 */
/**
 * @typedef {import("d3").ScaleLinear} D3ScaleLinear
 */
declare class Scaler {
    /**
     * @type D3ScaleLinear
     */
    scaler: D3ScaleLinear;
    /**
     * @type {?number=}
     */
    length: (number | null) | undefined;
    /**
     * @type {?any[]=}
     */
    list: (any[] | null) | undefined;
}
export {};

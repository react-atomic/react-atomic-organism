export type CurveFactoryType = import("d3").CurveFactory;
export type Curve = {
    type?: CurveFactoryType;
    center?: {
        x: number;
        y: number;
    };
};
export type D3ScaleLinear = import("d3").ScaleLinear;
/**
 * @typedef {import("d3").CurveFactory} CurveFactoryType
 */
/**
 * @typedef {object} Curve
 * @property {CurveFactoryType} [type]
 * @property {{x: number, y: number}} [center]
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
 * @param {Coordinate} d
 * @returns {number}
 */
declare const defaultXLocator: (d: Coordinate) => number;
/**
 * @param {Coordinate} d
 * @returns {number}
 */
declare const defaultYLocator: (d: Coordinate) => number;
/**
 * @param {Coordinate[]} points
 * @param {Function} xLocator
 * @param {Function} yLocator
 * @returns {Coordinate}
 */
declare const getPointsCenter: (points: Coordinate[], xLocator?: Function, yLocator?: Function) => Coordinate;
/**
 * @param {Coordinate} start
 * @param {Coordinate} end
 * @param {Curve} curve
 */
declare const _line: (start: Coordinate, end: Coordinate, curve: Curve, xLocator?: typeof defaultXLocator, yLocator?: typeof defaultYLocator) => {
    center: any;
    d: any;
};
declare const line: import("memoize-one").MemoizedFn<typeof _line>;
/**
 * @param {any} data
 * @param {Scaler} xScale
 * @param {Scaler} yScale
 */
declare const curve: (data: any, xScale: Scaler, yScale: Scaler, xLocator?: typeof defaultXLocator, yLocator?: typeof defaultYLocator) => any;
/**
 * @param {any} data
 * @param {Curve} curve
 */
declare const _hArea: (data: any, curve: Curve, { y0Locator, y1Locator, xLocator, }?: {
    xLocator?: typeof defaultXLocator;
    y0Locator?: (d: any) => any;
    y1Locator?: (d: any) => any;
}) => any;
declare const hArea: import("memoize-one").MemoizedFn<typeof _hArea>;
/**
 * @see https://github.com/d3/d3-shape/blob/master/README.md#pies
 * @param {any} data
 * @param {number} inner
 * @param {number} outer
 */
declare const pie: (data: any, inner: number, outer: number, valueLocator?: (/**@type any*/ d: any) => any) => {
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
declare const arc: (data: any, inner: number, outer: number, cornerRadius?: number | undefined) => {
    outerRadius: number;
    innerRadius: number;
    items: any;
};
/**
 * @param {any} data
 * @param {any[]} keyList
 */
declare const stack: (data: any, keyList: any[]) => any;
declare const colors: (scheme?: string) => any;
/**
 * @param {any} data
 * @param {number} start
 * @param {number} end
 */
declare const scaleBand: (data: any, start: number, end: number, labelLocator?: (/**@type any*/ d: any) => any, tickNum?: number) => {
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
declare const scaleLinear: (data: any, start: number, end: number, labelLocator?: (Function | null) | undefined, tickNum?: (number | null) | undefined, more?: (number[] | null) | undefined) => {
    scaler: any;
    list: {};
};
/**
 * Events, DnD, Zoom
 */
declare const d3DnD: ({ el, container, touchable, start, end, drag, subject }: {
    container: any;
    drag: any;
    el: any;
    end: any;
    start: any;
    subject: any;
    touchable: any;
}) => void;
declare const d3Zoom: ({ el, scaleExtent, callback }: {
    callback: any;
    el: any;
    scaleExtent: any;
}) => any;
/**
 * @param {any} el
 */
declare const getZoom: (el: any) => any;
declare const toZoomTransform: ({ x, y, k }: {
    k: any;
    x: any;
    y: any;
}) => any;
/**
 * @param {any} el
 */
declare const d3Select: (el: any) => any;
export { line, curve, hArea, pie, arc, stack, colors, scaleBand, scaleLinear, d3DnD, d3Zoom, getZoom, d3Select, getPointsCenter, toZoomTransform, };

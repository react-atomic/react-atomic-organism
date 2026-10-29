export declare const D3JS: {
    /**
     * @type any
     */
    curveCatmullRom: any;
    curveBasis: any;
    curveMonotoneX: any;
    /**
     * @type any
     */
    line: any;
    /**
     * @type any
     */
    pie: any;
    /**
     * @type any
     */
    arc: any;
    /**
     * @type any
     */
    area: any;
    /**
     * @type any
     */
    stack: any;
    stackOrderNone: any;
    stackOffsetNone: any;
    /**
     * @type any
     */
    scaleLinear: any;
    /**
     * @type any
     */
    scaleBand: any;
    /**
     * @type any
     */
    scaleOrdinal: any;
    /**
     * @type any
     */
    drag: any;
    /**
     * @type any
     */
    select: any;
    /**
     * @type any
     */
    zoom: any;
    /**
     * @type any
     */
    zoomTransform: any;
    /**
     * @type any
     */
    zoomIdentity: any;
    schemeAccent: any;
    schemeBlues: any;
    schemeBrBG: any;
    schemeBuGn: any;
    schemeBuPu: any;
    schemeCategory10: any;
    schemeDark2: any;
    schemeGnBu: any;
    schemeGreens: any;
    schemeGreys: any;
    schemeOrRd: any;
    schemeOranges: any;
    schemePRGn: any;
    schemePaired: any;
    schemePastel1: any;
    schemePastel2: any;
    schemePiYG: any;
    schemePuBu: any;
    schemePuBuGn: any;
    schemePuOr: any;
    schemePuRd: any;
    schemePurples: any;
    schemeRdBu: any;
    schemeRdGy: any;
    schemeRdPu: any;
    schemeRdYlBu: any;
    schemeRdYlGn: any;
    schemeReds: any;
    schemeSet1: any;
    schemeSet2: any;
    schemeSet3: any;
    schemeSpectral: any;
    schemeTableau10: any;
    schemeYlGn: any;
    schemeYlGnBu: any;
    schemeYlOrBr: any;
    schemeYlOrRd: any;
};
export type D3KeyList = keyof typeof D3JS;
/**
 * @typedef {keyof typeof D3JS} D3KeyList
 */
/**
 * @param {{[key in D3KeyList]: any}} d3js
 */
export declare const handleGetD3: (d3js: { [key in D3KeyList]: any; }) => void;

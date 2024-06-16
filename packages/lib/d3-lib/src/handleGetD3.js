// @ts-check
import { KEYS } from "reshow-constant";

export const D3JS = {
  /**
   * @type any
   */
  curveCatmullRom: null,
  curveBasis: null,
  curveMonotoneX: null,
  /**
   * @type any
   */
  line: null,
  /**
   * @type any
   */
  pie: null,
  /**
   * @type any
   */
  arc: null,
  /**
   * @type any
   */
  area: null,
  /**
   * @type any
   */
  stack: null,
  stackOrderNone: null,
  stackOffsetNone: null,
  /**
   * @type any
   */
  scaleLinear: null,
  /**
   * @type any
   */
  scaleBand: null,
  /**
   * @type any
   */
  scaleOrdinal: null,
  /**
   * @type any
   */
  drag: null,
  /**
   * @type any
   */
  select: null,
  /**
   * @type any
   */
  zoom: null,
  /**
   * @type any
   */
  zoomTransform: null,
  /**
   * @type any
   */
  zoomIdentity: null,

  schemeAccent: null,
  schemeBlues: null,
  schemeBrBG: null,
  schemeBuGn: null,
  schemeBuPu: null,
  schemeCategory10: null,
  schemeDark2: null,
  schemeGnBu: null,
  schemeGreens: null,
  schemeGreys: null,
  schemeOrRd: null,
  schemeOranges: null,
  schemePRGn: null,
  schemePaired: null,
  schemePastel1: null,
  schemePastel2: null,
  schemePiYG: null,
  schemePuBu: null,
  schemePuBuGn: null,
  schemePuOr: null,
  schemePuRd: null,
  schemePurples: null,
  schemeRdBu: null,
  schemeRdGy: null,
  schemeRdPu: null,
  schemeRdYlBu: null,
  schemeRdYlGn: null,
  schemeReds: null,
  schemeSet1: null,
  schemeSet2: null,
  schemeSet3: null,
  schemeSpectral: null,
  schemeTableau10: null,
  schemeYlGn: null,
  schemeYlGnBu: null,
  schemeYlOrBr: null,
  schemeYlOrRd: null,
};

/**
 * @typedef {keyof D3JS} D3KeyList
 */

/**
 * @param {{[key in D3KeyList]: any}} d3js
 */
export const handleGetD3 = (d3js) => {
  const importKeyArr = KEYS(D3JS);
  let i = importKeyArr.length;
  while (i--) {
    const key = importKeyArr[i];
    D3JS[key] = d3js[key];
  }
};

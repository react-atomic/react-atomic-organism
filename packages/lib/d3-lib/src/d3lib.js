// @ts-check

import { D3JS } from "./handleGetD3";

import memoizeOne from "memoize-one";
import get from "get-object-value";
import arrayMinMax from "array.min.max";
import { KEYS } from "reshow-constant";

/**
 * @typedef {import("d3").curveBasis} Curve
 */

/**
 * @typedef {import("d3").ScaleLinear} D3ScaleLinear
 */

class Scaler {
  /**
   * @type D3ScaleLinear
   */
  scaler;

  /**
   * @type {?number=}
   */
  length;

  /**
   * @type {?any[]=}
   */
  list;
}

/**
 * @see https://web.archive.org/web/20190414162355/http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
 * @param {Curve=} curve
 * @param {Curve=} def
 * @returns {Curve}
 */
const getCurveType = (curve, def) =>
  curve && curve.type ? curve.type : def || D3JS.curveCatmullRom.alpha(0.5);

class Coordinate {
  /**
   * @type {number}
   */
  x;
  /**
   * @type {number}
   */
  y;
}

/**
 * @param {Coordinate} d
 * @returns {number}
 */
const defaultXLocator = (d) => (d || {}).x;
/**
 * @param {Coordinate} d
 * @returns {number}
 */
const defaultYLocator = (d) => (d || {}).y;

/**
 * @param {Coordinate[]} points
 * @param {Function} xLocator
 * @param {Function} yLocator
 * @returns {Coordinate}
 */
const getPointsCenter = (
  points,
  xLocator = defaultXLocator,
  yLocator = defaultYLocator,
) => {
  const xCal = new arrayMinMax().process(xLocator)(points);
  const yCal = new arrayMinMax().process(yLocator)(points);
  return {
    x: (xCal.max - xCal.min) / 2 + xCal.min,
    y: (yCal.max - yCal.min) / 2 + yCal.min,
  };
};

// https://github.com/d3/d3-shape/blob/master/README.md#lines
/**
 * @param {Coordinate} start
 * @param {Coordinate} end
 * @param {Curve} curve
 */
const _line = (
  start,
  end,
  curve,
  xLocator = defaultXLocator,
  yLocator = defaultYLocator,
) => {
  let c;
  let points = [start, end];
  let l = D3JS.line().x(xLocator).y(yLocator);
  if (curve) {
    l = l.curve(getCurveType(curve, D3JS.curveBasis));
    c = curve.center || {
      x: getPointsCenter(points, xLocator, yLocator).x,
      y: start.y,
    };
    points = [start, c, end];
  } else {
    c = getPointsCenter(points, xLocator, yLocator);
  }
  const result = {
    center: c,
    d: l(points),
  };
  return result;
};
const line = memoizeOne(_line);

/**
 * @param {any} data
 * @param {Scaler} xScale
 * @param {Scaler} yScale
 */
const curve = (
  data,
  xScale,
  yScale,
  xLocator = defaultXLocator,
  yLocator = defaultYLocator,
) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
  const l = D3JS.line()
    .curve(getCurveType())
    .x((/**@type any*/ d) => {
      let num = xScale.scaler(xLocator(d));
      if (xScale.length) {
        num += xScale.length;
      }
      return num;
    })
    .y((/**@type any*/ d) => {
      let num = yScale.scaler(yLocator(d));
      if (yScale.length) {
        num += yScale.length;
      }
      return num;
    });
  return l(data);
};

/**
 * @param {any} data
 * @param {Curve} curve
 */
const _hArea = (
  data,
  curve,
  {
    y0Locator = (/**@type any*/ d) => d.y0,
    y1Locator = (/**@type any*/ d) => d.y1,
    xLocator = defaultXLocator,
  } = {},
) => {
  let series = D3JS.area().x(xLocator).y0(y0Locator).y1(y1Locator);
  if (curve) {
    series = series.curve(getCurveType(curve, D3JS.curveMonotoneX));
  }
  return series(data);
};
const hArea = memoizeOne(_hArea);

/**
 * @see https://github.com/d3/d3-shape/blob/master/README.md#pies
 * @param {any} data
 * @param {number} inner
 * @param {number} outer
 */
const pie = (
  data,
  inner,
  outer,
  valueLocator = (/**@type any*/ d) => d.value,
) => {
  let p = D3JS.pie().value(valueLocator)(data);
  return arc(p, inner, outer);
};

/**
 * @see https://d3js.org/d3-shape/arc#arc
 * @param {any} data
 * @param {number} inner
 * @param {number} outer
 * @param {number=} cornerRadius
 */
const arc = (data, inner, outer, cornerRadius) => {
  let d3Arc = D3JS.arc();
  if (!inner) {
    inner = 0;
  }
  if (!outer) {
    if (inner) {
      outer = inner * 2;
    } else {
      outer = 50;
    }
  }
  const color = colors();
  const radius = {
    outerRadius: outer,
    innerRadius: inner,
  };
  const items = data.map((/**@type any*/ item) => {
    const params = {
      ...item,
      ...radius,
    };
    if (cornerRadius) {
      d3Arc = d3Arc.cornerRadius(cornerRadius);
    }
    item.path = d3Arc(params);
    item.centroid = d3Arc.centroid(params);
    item.color = color(item.index);
    return item;
  });
  return {
    items,
    ...radius,
  };
};

// https://github.com/d3/d3-shape/blob/master/README.md#stacks
/**
 * @param {any} data
 * @param {any[]} keyList
 */
const stack = (data, keyList) => {
  if (!keyList) {
    keyList = KEYS(data[0]);
  }
  let series = D3JS.stack()
    .keys(keyList)
    .order(D3JS.stackOrderNone)
    .offset(D3JS.stackOffsetNone)(data);
  return series;
};

// scheme
// https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
// https://github.com/d3/d3-scale-chromatic
const defaultColorScheme = "schemeCategory10";
const colors = (scheme = defaultColorScheme) => {
  return D3JS.scaleOrdinal(get(D3JS, [scheme], defaultColorScheme));
};

// text label
// https://github.com/d3/d3-scale/blob/master/README.md#band-scales
/**
 * @param {any} data
 * @param {number} start
 * @param {number} end
 */
const scaleBand = (
  data,
  start,
  end,
  labelLocator = (/**@type any*/ d) => d.label,
  tickNum = 10,
) => {
  let list = {};
  /**
   * Use range() could benifit for max width, when you have lot of items.
   */
  let band = D3JS.scaleBand()
    .range([start, end])
    .paddingInner(0.05)
    .align(0.1)
    .domain(
      data.map((/**@type any*/ d) => {
        const key = labelLocator(d);
        list[key] = null;
        return key;
      }),
    );
  const length = band.bandwidth();
  const halfLength = Math.round(length / 2);
  const allKeys = KEYS(list);
  /**
   * @type {any[]=}
   */
  let listKeys = allKeys;
  if (tickNum && listKeys.length > tickNum) {
    let newKeys = [];
    let chunk;
    let chunkNum = Math.round(listKeys.length / tickNum);
    for (let i = 0, j = listKeys.length; i < j; i += chunkNum) {
      chunk = listKeys.slice(i, i + chunkNum);
      newKeys.push(chunk.pop());
    }
    listKeys = newKeys;
    list = {};
  }
  listKeys.forEach((k) => {
    const start = band(k);
    list[k] = {
      start: start,
      value: start + halfLength,
    };
  });
  band.invertIndex = (/**@type number*/ v) => {
    const step = band.step();
    const index = Math.floor(v / step);
    return index;
  };
  band.invert = (/**@type any*/ v) => allKeys[band.invertIndex(v)];
  return {
    scaler: band,
    list,
    length,
  };
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
const scaleLinear = (
  data,
  start,
  end,
  labelLocator = (/**@type any*/ d) => d,
  tickNum,
  more,
) => {
  const oMinMax = new arrayMinMax();
  oMinMax.process(labelLocator || undefined)(data);
  oMinMax.process()(more);
  const scaler = D3JS.scaleLinear()
    .rangeRound([start, end])
    .domain(oMinMax.toArray())
    .nice();
  const ticks = scaler.ticks(tickNum);
  const list = {};
  ticks.forEach((/**@type any*/ k) => (list[k] = { value: scaler(k) }));
  return {
    scaler,
    list,
  };
};

/**
 * Events, DnD, Zoom
 */
const d3DnD = ({ el, container, touchable, start, end, drag, subject }) => {
  let dd = D3JS.drag();
  if (container) {
    dd = dd.container(container);
  }
  if (touchable) {
    dd = dd.touchable(touchable);
  }
  if (start) {
    dd = dd.on("start", start);
  }
  if (end) {
    dd = dd.on("end", end);
  }
  if (drag) {
    dd = dd.on("drag", drag);
  }
  if (subject) {
    dd = dd.subject(subject);
  }
  d3Select(el).call(dd);
};

const d3Zoom = ({ el, scaleExtent, callback }) => {
  const eventCb = null == callback ? null : callback;
  const zoom = D3JS.zoom().scaleExtent(scaleExtent).on("zoom", eventCb);
  d3Select(el).call(zoom);
  return zoom;
};

/**
 * @param {any} el
 */
const getZoom = (el) => D3JS.zoomTransform(d3Select(el).node());

const toZoomTransform = ({ x, y, k }) =>
  D3JS.zoomIdentity.translate(x, y).scale(k);

/**
 * @param {any} el
 */
const d3Select = (el) => D3JS.select(el);

export {
  line,
  curve,
  hArea,
  pie,
  arc,
  stack,
  colors,
  scaleBand,
  scaleLinear,
  d3DnD,
  d3Zoom,
  getZoom,
  d3Select,
  getPointsCenter,
  toZoomTransform,
};

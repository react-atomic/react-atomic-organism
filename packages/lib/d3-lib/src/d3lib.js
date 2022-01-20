import memoizeOne from "memoize-one";
import get from "get-object-value";
import arrayMinMax from "array.min.max";
import { KEYS } from "reshow-constant";

const D3JS = {
  curveCatmullRom: null,
  curveBasis: null,
  curveMonotoneX: null,
  line: null,
  pie: null,
  arc: null,
  area: null,
  stack: null,
  scaleLinear: null,
  scaleBand: null,
  scaleOrdinal: null,
  stackOrderNone: null,
  stackOffsetNone: null,
  drag: null,
  select: null,
  zoom: null,
  zoomTransform: null,
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
  schemeYlOrRd: null
};

const handleGetD3 = (d3js) => {
  const importKeyArr = KEYS(D3JS);
  let i = importKeyArr.length;
  while (i--) {
    const key = importKeyArr[i];
    D3JS[key] = d3js[key];
  }
};

// https://web.archive.org/web/20190414162355/http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
const getCurveType = (curve, def) =>
  curve && curve.type ? curve.type : def || D3JS.curveCatmullRom.alpha(0.5);

const defaultXLocator = (d) => (d || {}).x;
const defaultYLocator = (d) => (d || {}).y;

const getPointsCenter = (points, xLocator, yLocator) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
  const xCal = new arrayMinMax().process(xLocator)(points);
  const yCal = new arrayMinMax().process(yLocator)(points);
  return {
    x: (xCal.max - xCal.min) / 2 + xCal.min,
    y: (yCal.max - yCal.min) / 2 + yCal.min,
  };
};

// https://github.com/d3/d3-shape/blob/master/README.md#lines
const _line = (start, end, curve, xLocator, yLocator) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
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

const curve = (data, xLocator, yLocator, xScale, yScale) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
  const l = D3JS.line()
    .curve(getCurveType())
    .x((d) => {
      let num = xScale.scaler(xLocator(d));
      if (xScale.length) {
        num += xScale.length;
      }
      return num;
    })
    .y((d) => {
      let num = yScale.scaler(yLocator(d));
      if (yScale.length) {
        num += yScale.length;
      }
      return num;
    });
  return l(data);
};

const _hArea = (data, xLocator, y0Locator, y1Locator, curve) => {
  xLocator = xLocator || defaultXLocator;
  if (!y0Locator) {
    y0Locator = (d) => d.y0;
  }
  if (!y1Locator) {
    y1Locator = (d) => d.y1;
  }
  let series = D3JS.area().x(xLocator).y0(y0Locator).y1(y1Locator);
  if (curve) {
    series = series.curve(getCurveType(curve, D3JS.curveMonotoneX));
  }
  return series(data);
};
const hArea = memoizeOne(_hArea);

// https://github.com/d3/d3-shape/blob/master/README.md#pies
const pie = (data, inner, outer, valueLocator) => {
  if (!valueLocator) {
    valueLocator = (d) => d.value;
  }
  let p = D3JS.pie().value(valueLocator)(data);
  return arc(p, inner, outer);
};

// https://github.com/d3/d3-shape/blob/master/README.md#arcs
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
  const items = data.map((item) => {
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
const colors = (scheme) => {
  const defaultScheme = "schemeCategory10";
  if (!scheme) {
    scheme = defaultScheme;
  }
  return D3JS.scaleOrdinal(get(D3JS, [scheme], defaultScheme));
};

// text label
// https://github.com/d3/d3-scale/blob/master/README.md#band-scales
const scaleBand = (data, start, end, labelLocator, tickNum = 10) => {
  if (!labelLocator) {
    labelLocator = (d) => d.label;
  }
  let list = {};
  /**
   * Use range() could benifit for max width, when you have lot of items.
   */
  let band = D3JS.scaleBand()
    .range([start, end])
    .paddingInner(0.05)
    .align(0.1)
    .domain(
      data.map((d) => {
        const key = labelLocator(d);
        list[key] = null;
        return key;
      })
    );
  const length = band.bandwidth();
  const halfLength = Math.round(length / 2);
  const allKeys = KEYS(list);
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
  band.invertIndex = (v) => {
    const step = band.step();
    const index = Math.floor(v / step);
    return index;
  };
  band.invert = (v) => allKeys[band.invertIndex(v)];
  return {
    scaler: band,
    list: list,
    length: length,
  };
};

// numeric label
// https://github.com/d3/d3-scale/blob/master/README.md#linear-scales
const scaleLinear = (data, start, end, labelLocator, tickNum, more) => {
  let cookData;
  const oMinMax = new arrayMinMax();
  oMinMax.process(labelLocator)(data);
  oMinMax.process()(more);
  const scaler = D3JS.scaleLinear()
    .rangeRound([start, end])
    .domain(oMinMax.toArray())
    .nice();
  const ticks = scaler.ticks(tickNum);
  const list = {};
  ticks.forEach((k) => (list[k] = { value: scaler(k) }));
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

const getZoom = (el) => D3JS.zoomTransform(d3Select(el).node());

const toZoomTransform = ({ x, y, k }) =>
  D3JS.zoomIdentity.translate(x, y).scale(k);

const d3Select = (el) => D3JS.select(el);

export {
  handleGetD3,
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

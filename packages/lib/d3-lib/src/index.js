// https://github.com/d3/d3/blob/master/index.js
import * as d3 from 'd3';
const {
  curveCatmullRom: d3_curveCatmullRom,
  curveNatural: d3_curveNatural,
  line: d3_line,
  pie: d3_pie,
  arc: d3_arc,
  area: d3_area,
  stack: d3_stack,
  scaleLinear: d3_scaleLinear,
  scaleBand: d3_scaleBand,
  scaleOrdinal: d3_scaleOrdinal,
  stackOrderNone: d3_stackOrderNone,
  stackOffsetNone: d3_stackOffsetNone,
  drag: d3_drag,
  select: d3_select,
  zoom: d3_zoom,
} = d3;
import get from 'get-object-value';
import arrayMinMax from 'array.min.max';

const keys = Object.keys;
const isArray = Array.isArray;

// https://web.archive.org/web/20190414162355/http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
const getCurveType = () => d3_curveCatmullRom.alpha(0.5);

const defaultXLocator = d => d.x;
const defaultYLocator = d => d.y;

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
const line = (start, end, curve, xLocator, yLocator) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
  let points = [start, end];
  let l = d3_line()
    .x(xLocator)
    .y(yLocator);
  if (curve) {
    l = l.curve(d3_curveNatural);
    const c = getPointsCenter(points, xLocator, yLocator);
    points = [start, {x: c.x, y: start.y}, end];
  }
  return l(points);
};

const curve = (data, xLocator, yLocator, xScale, yScale) => {
  xLocator = xLocator || defaultXLocator;
  yLocator = yLocator || defaultYLocator;
  const l = d3_line()
    .curve(getCurveType())
    .x(d => {
      let num = xScale.scaler(xLocator(d));
      if (xScale.length) {
        num += xScale.length;
      }
      return num;
    })
    .y(d => {
      let num = yScale.scaler(yLocator(d));
      if (yScale.length) {
        num += yScale.length;
      }
      return num;
    });
  return l(data);
};

// https://github.com/d3/d3-shape/blob/master/README.md#pies
const pie = (data, inner, outer, valueLocator) => {
  if (!valueLocator) {
    valueLocator = d => {
      return d.value;
    };
  }
  let p = d3_pie().value(valueLocator)(data);
  return arc(p, inner, outer);
};

// https://github.com/d3/d3-shape/blob/master/README.md#arcs
const arc = (data, inner, outer) => {
  const d3Arc = d3_arc();
  if (!inner) {
    inner = 0;
  }
  if (!outer) {
    if (inner) {
      outer = inner * 2;
    } else {
      outer = 0;
    }
  }
  const color = colors();
  const radius = {
    outerRadius: outer,
    innerRadius: inner,
  };
  data.map(item => {
    let params = {
      ...item,
      ...radius,
    };
    item.path = d3Arc(params);
    item.centroid = d3Arc.centroid(params);
    item.color = color(item.index);
    return item;
  });
  return {
    data: data,
    ...radius,
  };
};

// scheme
// https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
// https://github.com/d3/d3-scale-chromatic
const colors = scheme => {
  const defaultScheme = 'schemeCategory10';
  if (!scheme) {
    scheme = defaultScheme;
  }
  return d3_scaleOrdinal(get(d3, [scheme], defaultScheme));
};

// https://github.com/d3/d3-shape/blob/master/README.md#stacks
const stack = (data, keyList) => {
  if (!keyList) {
    keyList = keys(data[0]);
  }
  let series = d3_stack()
    .keys(keyList)
    .order(d3_stackOrderNone)
    .offset(d3_stackOffsetNone)(data);
  return series;
};

const hArea = (data, xLocator, y0Locator, y1Locator) => {
  if (!xLocator) {
    xLocator = d => d.x;
  }
  if (!y0Locator) {
    y0Locator = d => d.y0;
  }
  if (!y1Locator) {
    y1Locator = d => d.y1;
  }
  let series = d3_area()
    .curve(getCurveType())
    .x(xLocator)
    .y0(y0Locator)
    .y1(y1Locator)(data);
  return series;
};

// text label
// https://github.com/d3/d3-scale/blob/master/README.md#band-scales
const scaleBand = (data, start, end, labelLocator, tickNum = 10) => {
  if (!labelLocator) {
    labelLocator = d => d.label;
  }
  let list = {};
  /**
   * Use range() could benifit for max width, when you have lot of items.
   */
  let band = d3_scaleBand()
    .range([start, end])
    .paddingInner(0.05)
    .align(0.1)
    .domain(
      data.map(d => {
        const key = labelLocator(d);
        list[key] = null;
        return key;
      }),
    );
  const length = band.bandwidth();
  const halfLength = Math.round(length / 2);
  const allKeys = keys(list);
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
  listKeys.forEach(k => {
    const start = band(k);
    list[k] = {
      start: start,
      value: start + halfLength,
    };
  });
  band.invertIndex = v => {
    const step = band.step();
    const index = Math.floor(v / step);
    return index;
  };
  band.invert = v => allKeys[band.invertIndex(v)];
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
  const scaler = d3_scaleLinear()
    .rangeRound([start, end])
    .domain(oMinMax.toArray())
    .nice();
  const ticks = scaler.ticks(tickNum);
  const list = {};
  ticks.forEach(k => (list[k] = {value: scaler(k)}));
  return {
    scaler,
    list,
  };
};

/**
 * Events, DnD, Zoom
 */

const d3DnD = ({el, start, end, drag, subject}) => {
  let dd = d3_drag().container(el);
  if (start) {
    dd = dd.on('start', start);
  }
  if (end) {
    dd = dd.on('end', end);
  }
  if (drag) {
    dd = dd.on('drag', drag);
  }
  if (subject) {
    dd = dd.subject(subject);
  }
  d3Select(el).call(dd);
};

const d3Zoom = ({el, scaleExtent, callback}) => {
  const dSelect = d3Select(el);
  const zoom = d3_zoom()
    .scaleExtent(scaleExtent)
    .on('zoom', () => callback(d3Event().transform));
  dSelect.call(zoom);
};

const d3Event = () => d3.event;

const d3Select = el => d3_select(el);

export {
  getPointsCenter,
  line,
  curve,
  pie,
  stack,
  hArea,
  colors,
  scaleBand,
  scaleLinear,
  d3DnD,
  d3Zoom,
  d3Event,
  d3Select,
};

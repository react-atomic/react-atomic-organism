'use strict';

import * as d3 from 'd3';
import get from 'get-object-value';
import minMaxHelper from './minMaxHelper';

const keys = Object.keys;
const isArray = Array.isArray;

const getCurveType = () =>
{
    return d3.curveCatmullRom.alpha(0.5);
}

// https://github.com/d3/d3-shape/blob/master/README.md#lines
const line = (start, end) =>
{
    const l = d3.line().
        x((d)=>d.x).
        y((d)=>d.y);
    return l([start, end]);
}

const curve = (data, xValueLocator, yValueLocator, xScale, yScale) =>
{
    const l = d3.line().
        curve(getCurveType()).
        x((d)=>{
            let num = xScale.scaler(xValueLocator(d));
            if (xScale.length) {
                num += xScale.length;
            }
            return num;
        }).
        y((d)=>{
            let num = yScale.scaler(yValueLocator(d));
            if (yScale.length) {
                num += yScale.length;
            }
            return num;
        });
    return l(data);
}

// https://github.com/d3/d3-shape/blob/master/README.md#pies
const pie = (data, inner, outer, valueLocator) =>
{
    if (!valueLocator) {
        valueLocator = (d) => {
            return d.value;
        }
    }
    let p = d3.pie().value(valueLocator)(data);
    return arc(
        p,
        inner,
        outer
    );
};

// https://github.com/d3/d3-shape/blob/master/README.md#arcs
const arc = (data, inner, outer) =>
{
    const d3Arc = d3.arc();
    if (!inner) {
        inner = 0;
    }
    if (!outer) {
        if (inner) {
            outer = inner*2;
        } else {
            outer = 0;
        }
    }
    const color = colors();
    const radius = {
        outerRadius: outer,
        innerRadius: inner
    };
    data.map((item)=>{
        let params = {
            ...item,
            ...radius
        };
        item.path = d3Arc(params);
        item.centroid = d3Arc.centroid(params);
        item.color = color(item.index);
        return item;
    });  
    return {
        data: data,
        ...radius
    };
};

// scheme
// https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
// https://github.com/d3/d3-scale-chromatic
const colors = (scheme) =>
{
    const defaultScheme = 'schemeCategory10';
    if (!scheme) {
        scheme = defaultScheme;
    }
    return d3.scaleOrdinal(get(d3, [scheme], defaultScheme));
}

// https://github.com/d3/d3-shape/blob/master/README.md#stacks
const stack = (data, keyList) =>
{
    if (!keyList) {
        keyList = keys(data[0]);
    }
    let series = d3.
        stack().
        keys(keyList).
        order(d3.stackOrderNone).
        offset(d3.stackOffsetNone)(data);
    return series;
}

const hArea = (data, xLocator, y0Locator, y1Locator) =>
{
    if (!xLocator) {
        xLocator = (d) => d.x;
    }
    if (!y0Locator) {
        y0Locator = (d) => d.y0;
    }
    if (!y1Locator) {
        y1Locator = (d) => d.y1;
    }
    let series = d3.
        area().
        curve(getCurveType()).
        x(xLocator).
        y0(y0Locator).
        y1(y1Locator)(data);
    return series;
}

// text label
// https://github.com/d3/d3-scale/blob/master/README.md#band-scales
const scaleBand = (
    data,
    start,
    end,
    labelLocator,
    tickNum = 10
) => {
    if (!labelLocator) {
        labelLocator = (d) => d.label;
    }
    let list = {};
    /**
     * Use range() could benifit for max width, when you have lot of items.
     */
    let band = d3.scaleBand().
        range([start, end]).
        paddingInner(0.05).
        align(0.1).
        domain(data.map((d)=>{
            const key = labelLocator(d);
            list[key] = null;
            return key;
        }));
    const length = band.bandwidth();
    const halfLength = Math.round(length/2);
    const allKeys = keys(list);
    let listKeys = allKeys;
    if (tickNum && listKeys.length > tickNum) {
        let newKeys = [];
        let chunk;
        let chunkNum = Math.round(listKeys.length / tickNum);
        for (let i=0,j=listKeys.length; i<j; i+=chunkNum) {
            chunk = listKeys.slice(i,i+chunkNum);
            newKeys.push(chunk.pop());
        }
        listKeys = newKeys;
        list = {};
    }
    listKeys.forEach((k)=>{
        const start = band(k);  
        list[k] = {
            start: start,
            value: start + halfLength
        };
    });
    band.invert = (v) => {
        const step = band.step();
        let index = Math.floor(v / step);
        const result = allKeys[index]; 
        return result;
    };
    return {
        scaler: band,
        list: list,
        length: length
    };
}

// numeric label
// https://github.com/d3/d3-scale/blob/master/README.md#linear-scales
const scaleLinear = (
    data,
    start,
    end,
    labelLocator,
    tickNum,
    more 
) => {
    let cookData;
    const oMinMax = new minMaxHelper();
    oMinMax.process(labelLocator)(data);
    oMinMax.process()(more);
    const scaler = d3.scaleLinear().
        rangeRound([start, end]).
        domain(oMinMax.toArray()).
        nice();
    const ticks = scaler.ticks(tickNum);
    const list = {};
    ticks.forEach( k =>
        list[k] = { value: scaler(k) }
    );
    return {
        scaler,
        list 
    };
}


export {
    line,
    curve,
    pie,
    stack,
    hArea,
    colors,
    scaleBand,
    scaleLinear,
    minMaxHelper
};


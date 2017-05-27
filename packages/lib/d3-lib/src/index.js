'use strict';

import * as d3 from 'd3';
import get from 'get-object-value';

const keys = Object.keys;

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
            return xScale.scaler(xValueLocator(d));
        }).
        y((d)=>{
            return yScale.scaler(yValueLocator(d));
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
// https://github.com/d3/d3-scale/blob/master/README.md#category-scales 
const colors = (scheme) =>
{
    const defaultScheme = 'schemeCategory20';
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
    min
) => {
    if (!labelLocator) {
        labelLocator =  (d) => d.value;
    }
    let cookData = data.map(labelLocator);
    if (min || 0===min) {
        cookData.push(min);
    }
    min = d3.min(cookData);
    let linear = d3.scaleLinear().
        rangeRound([start, end]).
        domain([
            min,
            d3.max(cookData)
        ]).nice(); 
    const ticks = linear.ticks(tickNum);
    let a = {};
    ticks.forEach((k)=>{
        a[k] = {
            value: linear(k)
        };
    });
    return {
        scaler: linear,
        list: a 
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
    scaleLinear
};


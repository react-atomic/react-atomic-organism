'use strict';

import * as d3 from 'd3';
import get from 'get-object-value';

const keys = Object.keys;

// https://github.com/d3/d3-shape/blob/master/README.md#lines
const line = (data, xValueLocator, yValueLocator, xScale, yScale) =>
{
    const l = d3.line().
        x((d)=>{
            return xScale.scaler(xValueLocator(d));
        }).
        y((d)=>{
            return yScale.scaler(yValueLocator(d));
        });
    return l(data);
}

// https://github.com/d3/d3-shape/blob/master/README.md#pies
const pie = (data, inner, outer, valueLocator)=>{
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
const arc = (data, inner, outer) => {
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

const area = (data, xLocator, yLocator) =>
{
    if (!xLocator) {
        xLocator = (d) => {
            return d[0];
        };
    }
    if (!yLocator) {
        yLocator = (d) => {
            return d[0];
        };
    }
    let series = d3.
        area().
        x(xLocator).
        y(yLocator)(data);
    return series;
}

// text label
// https://github.com/d3/d3-scale/blob/master/README.md#band-scales
const scaleBand = (
    data,
    start,
    end,
    labelLocator,
    tickNum
) => {
    if (!labelLocator) {
        labelLocator = (d) => {return d.label;};
    }
    let band = d3.scaleBand().
        rangeRound([start, end]).
        paddingInner(0.05).
        align(0.1);
    let a = {};
    band.domain(data.map((d)=>{
        let label = labelLocator(d);
        a[label] = {};
        return label;
    })); 
    let allKeys = keys(a);
    const length = band.bandwidth();
    const halfLength = Math.round(length/2);
    allKeys.forEach((k)=>{
        const start = band(k);  
        a[k].start = start;
        a[k].value = start + halfLength;
    });
    return {
        scaler: band,
        list: a,
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
        labelLocator =  (d) => {return d.value;};
    }
    let cookData = data.map(labelLocator);
    if (!min && 0 !== min) {
        min = d3.min(cookData);
    }
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
    pie,
    stack,
    colors,
    scaleBand,
    scaleLinear
};


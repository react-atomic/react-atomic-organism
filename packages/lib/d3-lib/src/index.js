'use strict';

import * as d3 from 'd3';
import get from 'get-object-value';

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

export {
    pie,
    colors
};


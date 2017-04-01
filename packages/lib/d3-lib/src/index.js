'use strict';

import * as d3 from 'd3';

const pie = (data, outer, inner, valueLocator)=>{
    if (!valueLocator) {
        valueLocator = (d) => {
            return d.value;
        }
    }
    let p = d3.pie().value(valueLocator)(data);
    return arc(p);
};

const arc = (data, outer, inner) => {
    const d3Arc = d3.arc();
    data.map((item)=>{
        let params = {
            ...item,
            outerRadius: outer,
            innerRadius: inner
        };
        item.path = d3Arc(params);
        item.centroid = d3Arc.centroid(params);
        return item;
    });  
    return data;
};

const colors = () =>
{
    return d3.scaleOrdinal(d3.schemeCategory10);
}

export {
    pie,
    colors
};


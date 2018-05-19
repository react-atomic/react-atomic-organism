import React from 'react'; 

import Line from '../molecules/Line';

const MultiLine = ({
    data,
    valuesLocator,
    xValueLocator,
    yValueLocator,
    attrsLocator,
    xScale,
    yScale,
    d3
}) =>
data.map( (line, key) =>{
    const attr = attrsLocator(line);
    const d = d3.curve(
        valuesLocator(line),
        xValueLocator,
        yValueLocator,
        xScale,
        yScale
    );
    return  (<Line d={d} {...attr} key={key}/>);
});

MultiLine.defaultProps = {
    valuesLocator: d => d.values,
    attrsLocator: d => d.attrs
};

export default MultiLine;

import React from 'react'; 

import Area from '../molecules/Area';

const MultiHArea = ({
    data,
    valuesLocator,
    attrsLocator,
    areaXLocator,
    areaY0Locator,
    areaY1Locator,
    xScale,
    yScale,
    d3
}) => 
data.map((area, key)=>{
    const attr = attrsLocator(area); 
    const d = d3.hArea(
        valuesLocator(area),
        d => xScale.scaler(areaXLocator(d))+xScale.length,
        d => yScale.scaler(areaY0Locator(d)),
        d => yScale.scaler(areaY1Locator(d))
    );
    return  (<Area d={d} key={key} {...attr}/>);
})

MultiHArea.defaultProps = {
    areaXLocator: d => d.x,
    areaY0Locator: d => d.y0,
    areaY1Locator: d => d.y1,
    valuesLocator: d => d.values,
    attrsLocator: d => d.attrs
};

export default MultiHArea;

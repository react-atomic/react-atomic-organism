import React from 'react'; 

import Candlestick from '../molecules/Candlestick';
import Group from '../molecules/Group';

const MultiCandlestick = ({
    tradeHighLocator,
    tradeLowLocator,
    tradeOpenLocator,
    tradeCloseLocator,
    data,
    valuesLocator,
    attrsLocator,
    xValueLocator,
    xScale,
    yScale,
    d3
}) => 
<Group className="data-group barchart">
{
    valuesLocator(data).map((d, key)=>{
        console.log(d, xValueLocator);
        const x = xScale.scaler(xValueLocator(d));
        const yOpen = yScale.scaler(tradeOpenLocator(d));
        const yClose = yScale.scaler(tradeCloseLocator(d));
        const arrY = [
            yScale.scaler(tradeHighLocator(d)),
            yScale.scaler(tradeLowLocator(d)),
            yOpen,
            yClose
        ];
        arrY.sort((a, b)=> b - a);
        return (
            <Candlestick
                x={x}
                y0={arrY[0]}
                y1={arrY[1]}
                y2={arrY[2]}
                y3={arrY[3]}
                width={xScale.length}
                key={key}
            />
        );
    })
}
</Group>

export default MultiCandlestick;

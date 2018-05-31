import React from 'react'; 
import {mixClass} from 'react-atomic-molecule';

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
<Group className="data-group candle-stick-chart">
{
    valuesLocator(data).map((d, key)=>{
        const x = xScale.scaler(xValueLocator(d));
        const open = yScale.scaler(tradeOpenLocator(d));
        const close = yScale.scaler(tradeCloseLocator(d));
        const arrY = [
            yScale.scaler(tradeHighLocator(d)),
            yScale.scaler(tradeLowLocator(d)),
            open,
            close
        ];
        arrY.sort((a, b)=> b - a);
        const classes = mixClass({
            positive: close > open,
            negative: close < open,
            neutral: close === open,
        });
        return (
            <Candlestick
                x={x}
                y0={arrY[0]}
                y1={arrY[1]}
                y2={arrY[2]}
                y3={arrY[3]}
                width={xScale.length}
                key={key}
                className={classes}
            />
        );
    })
}
</Group>

export default MultiCandlestick;

import React from 'react'; 

import Rect from '../molecules/Rect';
import Line from '../molecules/Line';

/**
 * y0
 * y1
 * y2
 * y3
 *
 * x
 * width
 */
const Candlestick = ({
    y0, y1, y2, y3, x, width
}) =>
{
    const center = x + Math.floor(width / 2);
    return [
        <Line
            key={x+'-line'}
            start={{
                x: center,
                y: y0
            }}
            end={{
                x: center,
                y: y3
            }}
            svgLine={true}
        />,
        <Rect 
            key={x+'-rect'}
            x={x}
            y={y1}
            width={width}
            height={y1-y2+1}
        />,
    ];
}

export default Candlestick;

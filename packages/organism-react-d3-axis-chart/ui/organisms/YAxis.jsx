import React from 'react'; 

import Axis from '../molecules/Axis';
import YAxisLabel from '../organisms/YAxisLabel'; 

const YAxis = ({length, ...props}) =>
{
    return (
        <Axis
            path={`M-1,0H0V${length}H-1`}
            x="0"
            textAttr={{
                dy: '.32em',
                x: -9,
                style: {
                    textAnchor: 'end' 
                }
            }}
            lineAttr={{
                x2: -6,
                y2: 0
            }}
            crosshairLabel={<YAxisLabel />}
            {...props}
        />
    );
}

export default YAxis;

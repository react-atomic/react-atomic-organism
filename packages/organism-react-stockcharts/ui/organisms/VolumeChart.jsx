import React from 'react';
import {BarChart, resetProps} from 'organism-react-d3-axis-chart';
import {mixClass} from 'react-atomic-molecule';

import yFormat from '../../src/yFormat';

const VolumesAttrsLocator = openLocator => closeLocator => d =>
{
    const open = openLocator(d);
    const close = closeLocator(d);
    const className = mixClass({
       positive: close > open, 
       negative: close < open, 
       neutral: close === open
    });
    return {className};
}

const VolumeChart = ({
    tradeOpenLocator,
    tradeCloseLocator,
    data,
    ...props
}) => {
return ( 
    <BarChart
        {...resetProps(props)}
        data={data}
        xAxisAttr={{
            textRotate: -45
        }}
        yAxisAttr={{
            num: 3,
            format:yFormat 
        }}
        hideCrosshairXLabel={true}
        attrsLocator={VolumesAttrsLocator(tradeOpenLocator)(tradeCloseLocator)}
    />
)
}

VolumeChart.defaultProps = {
    multiChart: 'sub'
};

export default VolumeChart;

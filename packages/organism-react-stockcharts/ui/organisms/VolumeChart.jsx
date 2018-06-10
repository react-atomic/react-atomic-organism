import React from 'react';
import {BarChart} from 'organism-react-d3-axis-chart';
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
    ...props
}) =>
    <BarChart
        {...props}
        xAxisAttr={{
            textRotate: -45
        }}
        yAxisAttr={{
            num: 3,
            format:yFormat 
        }}
        multiChart="sub"
        crosshair={true}
        hideCrosshairXLabel={true}
        attrsLocator={VolumesAttrsLocator(tradeOpenLocator)(tradeCloseLocator)}
    />

VolumeChart.defaultProps = {
    multiChart: 'sub'
};

export default VolumeChart;

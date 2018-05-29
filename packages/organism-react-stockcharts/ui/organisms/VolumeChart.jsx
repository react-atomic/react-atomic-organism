import React from 'react';
import {BarChart} from 'organism-react-d3-axis-chart';
import yFormat from '../../src/yFormat';

const VolumeChart = props =>
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
    />

VolumeChart.defaultProps = {
    multiChart: 'sub'
};

export default VolumeChart;

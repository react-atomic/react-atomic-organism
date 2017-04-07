import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import {curve, scaleLinear, scaleBand} from 'd3-lib';
import get from 'get-object-value';

import Line from '../molecules/Line';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';

const BarChart = ({
    data,
    scaleW,
    scaleH,
    xValueLocator,
    yValueLocator,
    extraViewBox,
    color,
    textRotate,
    hideAxis,
    threshold,
    ...props
}) => {
    const xScale = scaleBand(data, 0, scaleW, xValueLocator);
    const yScale = scaleLinear(data, scaleH, 0, yValueLocator, null, null);
    let xaxis = null;
    let yaxis = null;
    let thresholdLine = null;
    if (!hideAxis) {
        xaxis = (
            <XAxis 
                scale={xScale}
                length={scaleW}
                textRotate={textRotate}
            />
        );
        yaxis = (
            <YAxis
                scale={yScale}
                length={scaleH}
            />
        );
    } else {
        extraViewBox = 1.1;
    }
    if (threshold) {
        const yThreshold = yScale.scaler(threshold);
        thresholdLine = (
            <Line
                start={{x:0, y:yThreshold}}
                end={{x:scaleW, y:yThreshold}}
                stroke="#f00"
            />
        );
    }
    const d = curve(data,  xValueLocator, yValueLocator, xScale, yScale);
    return (
        <SemanticUI
            {...props}
            viewBox={`0 0 ${Math.round(scaleW * extraViewBox)} ${Math.round(scaleH * extraViewBox)}`}>
            <SemanticUI atom="g" transform="translate(40, 40)">
                {xaxis}
                {yaxis}
                {thresholdLine}
                <Line d={d} />
            </SemanticUI>
        </SemanticUI>
    );
}

BarChart.defaultProps = {
    atom: 'svg',
    width: '100%',
    data: [],
    scaleW: 450,
    scaleH: 450,
    extraViewBox: 1.25,
    xValueLocator: (d)=>{return d.x;},
    yValueLocator: (d)=>{return d.y;},
    color: '#4682B4',
    hideAxis: false,
    textRotate: true,
};

export default BarChart;

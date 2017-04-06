import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import {stack, scaleLinear, scaleBand} from 'd3-lib';
import get from 'get-object-value';
import {lightenColor} from 'colorlib';

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
    ...props
}) => {
    const xScale = scaleBand(data, 5, scaleW, xValueLocator);
    const yScale = scaleLinear(data, scaleH, 0, yValueLocator, null, null);
    return (
        <SemanticUI {...props} viewBox={`0 0 ${scaleW * extraViewBox} ${scaleH * extraViewBox}`}>
            <SemanticUI atom="g" transform="translate(40, 40)">
                <XAxis 
                    scale={xScale}
                    transform={`translate(0, ${scaleW})`}
                    length={scaleW}
                    textRotate={textRotate}
                />
                <YAxis scale={yScale} length={scaleH}/>
                <SemanticUI atom="g" className="data-group">
                {
                    data.map((d)=>{
                        const y = yScale.scaler(yValueLocator(d));
                        return (
                            <SemanticUI atom="rect"
                                x={xScale.scaler(xValueLocator(d))}
                                y={y}
                                width={xScale.length}
                                height={scaleH - y}
                                fill={color}
                            />
                        );
                    })
                }
                </SemanticUI>
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
    xValueLocator: (d)=>{return d.label;},
    yValueLocator: (d)=>{return d.value;},
    color: '#4682B4',
    textRotate: true
};

export default BarChart;

import React, {Component} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import get from 'get-object-value';

import Line from '../molecules/Line';
import Area from '../molecules/Area';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';

class LineChart extends Component
{
    componentDidMount()
    {
        System.import('d3-lib').then(({
            curve,
            scaleLinear,
            scaleBand,
            hArea
        })=>{
            this.curve = curve;
            this.scaleLinear = scaleLinear;
            this.scaleBand = scaleBand;
            this.hArea = hArea;
            this.setState({
                isLoad: true
            });        
        });
    }

    render()
    {
        if (!get(this, ['state', 'isLoad'])) {
            return null;
        }
        const {
            areas,
            data,
            xAxisData,
            yAxisData,
            extraViewBox,
            scaleW,
            scaleH,
            xValueLocator,
            yValueLocator,
            xAxisRotate,
            hideAxis,
            threshold,
            ...props
        } = this.props;
        const xScale = this.scaleBand(
            get(xAxisData, null, get(data,[0, 'value'])),
            0,
            scaleW,
            xValueLocator
        );
        const yScale = this.scaleLinear(
            get(yAxisData, null, (()=>{
                let values = get(data,[0, 'value']);
                let area = get(areas,[0, 'value']);
                if (area) {
                    values = values.concat(area);
                }
                return values;
            })()),
            scaleH,
            0,
            (d) =>get(d, ['y1'], yValueLocator(d)),
            null,
            null
        );
        let xaxis = null;
        let yaxis = null;
        let thresholdLine = null;
        let thisExtraViewBox = extraViewBox;
        if (!hideAxis) {
            xaxis = (
                <XAxis 
                    scale={xScale}
                    length={scaleW}
                    height={scaleH}
                    textRotate={xAxisRotate}
                />
            );
            yaxis = (
                <YAxis
                    scale={yScale}
                    length={scaleH}
                />
            );
        } else {
            thisExtraViewBox = 1.1;
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
        return (
            <SemanticUI
                {...props}
                viewBox={`0 0 ${Math.round(scaleW * thisExtraViewBox)} ${Math.round(scaleH * thisExtraViewBox)}`}
            >
                <SemanticUI atom="g" transform="translate(40, 10)">
                    {xaxis}
                    {yaxis}
                    {thresholdLine}
                    {
                        data.map((line)=>{
                            const {value, attr} = line;                     
                            const d = this.curve(value, xValueLocator, yValueLocator, xScale, yScale);
                            return  (<Line d={d} {...attr}/>);
                        })
                    }
                    {
                        areas.map((area)=>{
                            const {value, attr} = area; 
                            const d = this.hArea(
                                value,
                                (d)=>xScale.scaler(d.x),
                                (d)=>yScale.scaler(d.y0),
                                (d)=>yScale.scaler(d.y1)
                            );
                            return  (<Area d={d} {...attr}/>);
                        })
                    }
                </SemanticUI>
            </SemanticUI>
        );
    }
}

LineChart.defaultProps = {
    atom: 'svg',
    width: '100%',
    data: [],
    scaleW: 450,
    scaleH: 450,
    extraViewBox: 1.25,
    xValueLocator: (d)=>{return d.x;},
    yValueLocator: (d)=>{return d.y;},
    hideAxis: false,
};

export default LineChart;

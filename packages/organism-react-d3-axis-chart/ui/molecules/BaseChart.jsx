import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';

import Line from '../molecules/Line';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';

class BaseChart extends Component
{
    componentDidMount()
    {
        System.import('d3-lib').then(({
            stack,
            curve,
            scaleLinear,
            scaleBand,
            hArea
        })=>{
            this.stack = stack;
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
            children,
            xAxisData,
            yAxisData,
            xValueLocator,
            yValueLocator,
            extraViewBox,
            scaleW,
            scaleH,
            hideAxis,
            xAxisRotate,
            threshold,
            ...props
        } = this.props;
        let xaxis = null;
        let yaxis = null;
        let thresholdLine = null;
        let thisExtraViewBox = extraViewBox;
        this.xScale = this.scaleBand(
            get(xAxisData, null, get(data,[0, 'value'])),
            0,
            scaleW,
            xValueLocator
        );
        this.yScale = this.scaleLinear(
            get(yAxisData, null, (()=>{
                let values = get(data, [0, 'value']);
                let area = get(areas, [0, 'value']);
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
        if (!hideAxis) {
            xaxis = (
                <XAxis 
                    scale={this.xScale}
                    length={scaleW}
                    height={scaleH}
                    textRotate={xAxisRotate}
                />
            );
            yaxis = (
                <YAxis
                    scale={this.yScale}
                    length={scaleH}
                />
            );
        } else {
            thisExtraViewBox = 1.05;
        }
        if (threshold) {
            const yThreshold = this.yScale.scaler(threshold);
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
                <SemanticUI atom="g" transform="translate(40, 20)">
                    {children(this)}
                    {xaxis}
                    {yaxis}
                    {thresholdLine}
                </SemanticUI>
            </SemanticUI>
        );
    }
}

BaseChart.defaultProps = {
    atom: 'svg',
    width: '100%',
    data: [],
    scaleW: 450,
    scaleH: 450,
    extraViewBox: 1.3,
    xValueLocator: (d)=>d.x,
    yValueLocator: (d)=>d.y,
    hideAxis: false,
};

export default BaseChart;

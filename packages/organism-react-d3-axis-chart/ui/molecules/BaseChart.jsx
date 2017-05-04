import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';

import Line from '../molecules/Line';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';

class BaseChart extends Component
{
    handleMouseEnter = (e)=>
    {
        //console.log('enter');
    }

    handleMouseLeave = (e)=>
    {
        //console.log('leave');
    }

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
            yScaleNum,
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
            yScaleNum,
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
            thisExtraViewBox = 50;
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
                viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(scaleH + thisExtraViewBox)}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <SemanticUI atom="g" transform="translate(45, 20)">
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
    yScaleNum: null,
    extraViewBox: 100,
    xValueLocator: (d)=>d.x,
    yValueLocator: (d)=>d.y,
    hideAxis: false,
    preserveAspectRatio: 'xMidYMid meet'
};

export default BaseChart;

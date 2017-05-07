import React, {Component, Children, cloneElement} from 'react'; 
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
            xAxisAttr,
            yAxisAttr,
            xValueLocator,
            yValueLocator,
            extraViewBox,
            scaleW,
            scaleH,
            hideAxis,
            threshold,
            multiChart,
            ...props
        } = this.props;
        let xaxis = null;
        let yaxis = null;
        let thresholdLine = null;
        let thisExtraViewBox = extraViewBox;
        this.xScale = this.scaleBand(
            get(xAxisAttr, ['data'], get(data,[0, 'value'])),
            0,
            scaleW,
            xValueLocator
        );
        this.yScale = this.scaleLinear(
            get(yAxisAttr, ['data'], ()=>{
                let values = get(data, [0, 'value']);
                let area = get(areas, [0, 'value']);
                if (area) {
                    values = values.concat(area);
                }
                return values;
            }),
            scaleH,
            0,
            (d) => get(d, ['y1'], yValueLocator(d)),
            get(yAxisAttr, ['num']),
            null
        );
        if (!hideAxis) {
            xaxis = (
                <XAxis 
                    scale={this.xScale}
                    length={scaleW}
                    height={scaleH}
                    {...xAxisAttr}
                    key="xaxis"
                />
            );
            yaxis = (
                <YAxis
                    scale={this.yScale}
                    length={scaleH}
                    key="yaxis"
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
                    key="threshold"
                />
            );
        }
        const childArr = [
            children(this),
            xaxis,
            yaxis,
            thresholdLine
        ];
        if (multiChart) {
            return (
                <SemanticUI 
                    {...props}
                    atom="g"
                >
                    {childArr}
                </SemanticUI>
            );
        }
        return (
            <SemanticUI
                {...props}
                viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(scaleH + thisExtraViewBox)}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <SemanticUI atom="g" transform="translate(50, 20)">
                    {childArr}
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
    extraViewBox: 100,
    xValueLocator: (d)=>d.x,
    yValueLocator: (d)=>d.y,
    hideAxis: false,
    preserveAspectRatio: 'xMidYMid meet'
};

export default BaseChart;

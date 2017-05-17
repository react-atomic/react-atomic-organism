import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';
import {mouse} from 'getoffset';

import Line from '../molecules/Line';
import Rect from '../molecules/Rect';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';
import Crosshair from '../organisms/Crosshair';

const adjustX = 50;
const adjustY = 20;

class BaseChart extends Component
{
    componentWillReceiveProps(nextProps)
    {
        const {crosshairX, hideCrosshairY} = nextProps;
        this.setState({
            crosshairX: crosshairX,
            hideCrosshairY: hideCrosshairY
        });
    }

    componentDidMount()
    {
        System.import('d3-lib').then(({
            stack,
            curve,
            scaleLinear,
            scaleBand,
            hArea,
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

    handleMouseEnter = (e)=>
    {
        const hideY = get(this, ['props', 'hideCrosshairY'], false);
        this.setState({
            hideCrosshairX: false, 
            hideCrosshairY: hideY, 
        });
    }

    handleMouseLeave = (e)=>
    {
        const hideY = get(this, ['props', 'hideCrosshairY'], true);
        this.setState({
            hideCrosshairX: true,
            hideCrosshairY: hideY, 
        });
    }

    handleMouseMove = (e)=>
    {
        const point = mouse(e);
        if (this.props.handleMouseMove) {
            this.props.handleMouseMove(e, point);
        }
        this.setState({
            crosshairX: point[0],
            crosshairY: point[1]
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

            /*crosshair*/
            crosshair,
            crosshairX: propsCrosshairX,
            hideCrosshairY: propsHideCrosshairY,
            handleMouseMove: propsHandleMouseMove,
            hideCrosshairXLabel,
            hideCrosshairYLabel,

            ...props
        } = this.props;
        const {
            crosshairX,
            crosshairY,
            hideCrosshairX,
            hideCrosshairY,
        } = get(this, ['state'], {});
        let xaxis = null;
        let yaxis = null;
        let thresholdLine = null;
        let thisCrosshair = null;
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
                    crosshairValue={crosshairX}
                    hideCrosshair={hideCrosshairY}
                    hideCrosshairLabel={hideCrosshairXLabel}
                />
            );
            yaxis = (
                <YAxis
                    scale={this.yScale}
                    length={scaleH}
                    {...yAxisAttr}
                    key="yaxis"
                    crosshairValue={crosshairY}
                    hideCrosshair={hideCrosshairX}
                    hideCrosshairLabel={hideCrosshairYLabel}
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
        if (crosshair) {
            thisCrosshair = (
                <Crosshair
                    scaleW={scaleW}
                    scaleH={scaleH}
                    x={crosshairX}
                    y={crosshairY}
                    hideX={hideCrosshairX}
                    hideY={hideCrosshairY}
                    xScale={this.xScale}
                    yScale={this.yScale}
                />
            );
        }
        const childArr = [
            children(this),
            xaxis,
            yaxis,
            thresholdLine,
            thisCrosshair
        ];
        if (multiChart) {
            return (
                <SemanticUI 
                    {...props}
                    atom="g"
                >
                    {childArr}
                    <Rect 
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        onMouseMove={this.handleMouseMove}
                        x="0"
                        y="0"
                        width={scaleW}
                        height={scaleH}
                        style={{pointerEvents:'all', fill:"none"}}
                    />
                </SemanticUI>
            );
        }
        return (
            <SemanticUI
                {...props}
                viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(scaleH + thisExtraViewBox)}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}
            >
                <SemanticUI atom="g" transform={`translate(${adjustX}, ${adjustY}`}>
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

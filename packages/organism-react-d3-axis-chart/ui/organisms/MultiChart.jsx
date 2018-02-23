import React, {Component, Children, cloneElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import get from 'get-object-value';

class MultiChart extends Component
{
    handleMouseEnter = (e)=>
    {
        this.setState({
            hideCrosshairY: false, 
        });
    }

    handleMouseLeave = (e)=>
    {
        this.setState({
            hideCrosshairY: true, 
        });
    }

    handleMouseMove = (point)=>
    {
        this.setState({
            hideCrosshairY: false, 
            crosshairX: point[0] 
        });
    }

    componentDidMount()
    {
        import('d3-lib').then(({
            scaleLinear,
            scaleBand,
        })=>{
            this.scaleLinear = scaleLinear;
            this.scaleBand = scaleBand;
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
            style,
            children,
            scaleW,
            scaleH,
            xAxisAttr,
            xValueLocator,
            extraViewBox,
            subChartScaleH,
            ...props
        } = this.props; 
        const {
            crosshairX,
            hideCrosshairY
        } = get(this, ['state'], {});
        this.xScale = this.scaleBand(
            get(xAxisAttr, ['data']),
            0,
            scaleW,
            xValueLocator
        );
        let thisExtraViewBox = extraViewBox;
        let subChartCount = 0;
        Children.forEach(children, (child)=>{
            if ('sub' === get(child,['props','multiChart'])) {
                subChartCount++;
            }
        });
        let thisScaleH = scaleH;
        let mainChartScaleH = 
            scaleH -
            20 -
            ((subChartScaleH+20) * subChartCount);
        if (mainChartScaleH < subChartScaleH) {
            mainChartScaleH = subChartScaleH;
            thisScaleH = (subChartScaleH+20) * (subChartCount+1);
        }
        let high = 0;
        return (
            <SemanticUI
                {...props}
                viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(thisScaleH + thisExtraViewBox)}`}
                style={{...style, pointerEvents:'bounding-box'}}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            > 
            {Children.map(children, (child, k)=>{
                let params = {
                    key: k,
                    scaleW: scaleW,
                    crosshairX: crosshairX,
                    hideCrosshairY: hideCrosshairY,
                    handleMouseMove: this.handleMouseMove,
                    xScale: this.xScale 
                };
                if ('main' === child.props.multiChart) {
                    high += 20 + mainChartScaleH;
                    return cloneElement(
                        child,
                        {
                            ...params,
                            scaleH: mainChartScaleH,
                            transform: `translate(50, ${high - mainChartScaleH})`,
                        }
                    );
                } else {
                    high += 20 + subChartScaleH;
                    return cloneElement(
                        child,
                        {
                            ...params,
                            scaleH: subChartScaleH,
                            transform: `translate(50, ${high - subChartScaleH})`,
                        }
                    );
                }
            })}
            </SemanticUI>
        );
    }
}

MultiChart.defaultProps = {
    atom: 'svg',
    preserveAspectRatio: 'xMidYMid meet',
    scaleW: 450,
    scaleH: 450,
    extraViewBox: 100,
    subChartScaleH: 68
}

export default MultiChart;

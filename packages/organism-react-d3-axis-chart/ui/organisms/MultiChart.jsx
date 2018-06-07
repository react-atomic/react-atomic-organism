import React, {Component, Children, cloneElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import get from 'get-object-value';
import getoffset from 'getoffset';

class MultiChart extends Component
{
    d3 = {};
    state = {isLoad: false};
    xScale = false;

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

    getParentWH()
    {
        const parentEl = this.el.parentNode;
        const {w, h} = getoffset(parentEl);
        return {w, h};
    }

    resize = () => {
        const {w, h} = this.getParentWH(); 
        this.setState({
            scaleW: w,
            scaleH: h,
        });
    }

    handleEl = el => {
        const {autoScale} = this.props;
        if (!this.el) {
            this.el = el;
            if (autoScale) {
                window.addEventListener("resize", this.resize);
                this.resize();
            }
        }
    }

    componentDidMount()
    {
        import('d3-lib').then(({
            scaleBand,
        })=>{
            this.d3 = {scaleBand};
            this.setState({
                isLoad: true
            });
        });
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.resize);
    }

    render()
    {
        const {
            isLoad,
            crosshairX,
            hideCrosshairY,
            scaleW: stateScaleW,
            scaleH: stateScaleH,
        } = this.state;
        if (!isLoad) {
            return null;
        }
        const {
            style,
            data,
            children,
            autoScale,
            scaleW,
            scaleH,
            xAxisAttr,
            xValueLocator,
            valuesLocator,
            extraViewBox,
            subChartScaleH,
            ...props
        } = this.props; 
        let thisScaleW = scaleW;
        let thisScaleH = scaleH;
        if (autoScale) {
            if (stateScaleW && stateScaleH) {
                thisScaleH = stateScaleH;
                thisScaleW = stateScaleW;
            }
        }
        const xAxisData = get( xAxisAttr, ['data'], ()=> data ? valuesLocator(data) : null );
        if (xAxisData) {
            this.xScale = this.d3.scaleBand(
                xAxisData,
                0,
                thisScaleW,
                xValueLocator
            );
        }
        let thisExtraViewBox = extraViewBox;
        let subChartCount = 0;
        Children.forEach(children, (child)=>{
            if ('sub' === get(child,['props','multiChart'])) {
                subChartCount++;
            }
        });
        let mainChartScaleH = 
            thisScaleH -
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
                viewBox={`0 0 ${Math.round(thisScaleW + thisExtraViewBox)} ${Math.round(thisScaleH + thisExtraViewBox)}`}
                style={{...style, pointerEvents:'bounding-box'}}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                refCb={this.handleEl}
            > 
            {Children.map(children, (child, key)=>{
                const params = {
                    key,
                    scaleW: thisScaleW,
                    crosshairX,
                    hideCrosshairY,
                    onMouseMove: this.handleMouseMove,
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
    valuesLocator: d => d.values,
    atom: 'svg',
    preserveAspectRatio: 'xMidYMid meet',
    scaleW: 500,
    scaleH: 500,
    autoScale: true,
    extraViewBox: 100,
    subChartScaleH: 68
}

export default MultiChart;

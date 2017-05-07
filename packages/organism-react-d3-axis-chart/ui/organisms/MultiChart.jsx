import React, {Children, cloneElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

const MultiChart = ({
    children,
    scaleW,
    scaleH,
    extraViewBox,
    subChartScaleH,
    ...props
}) => {
    let thisExtraViewBox = extraViewBox;
    let subChartCount = 0;
    Children.forEach(children, (child)=>{
        if ('sub' === child.props.multiChart) {
            subChartCount++;
        }
    });
    let mainChartScaleH = 
        scaleH -
        20 -
        ((subChartScaleH+20) * subChartCount);
    let high = 0;
    return (
        <SemanticUI
            {...props}
            viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(scaleH + thisExtraViewBox)}`}
        > 
        {Children.map(children, (child, k)=>{
            if ('main' === child.props.multiChart) {
                high += 20 + mainChartScaleH;
                return cloneElement(
                    child,
                    {
                        k: k,
                        scaleW: scaleW,
                        scaleH: mainChartScaleH,
                        transform: `translate(50, ${high - mainChartScaleH})`,
                    }
                );
            } else {
                high += 20 + subChartScaleH;
                return cloneElement(
                    child,
                    {
                        k: k,
                        scaleW: scaleW,
                        scaleH: subChartScaleH,
                        transform: `translate(50, ${high - subChartScaleH})`,
                    }
                );
            }
        })}
        </SemanticUI>
    );
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

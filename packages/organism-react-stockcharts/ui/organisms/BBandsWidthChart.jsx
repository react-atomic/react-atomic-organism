import React from 'react';
import { LineChart } from 'organism-react-d3-axis-chart';
import yFormat from '../../src/yFormat';

const BBandsWidthChart = ({
    data,
    xValueLocator,
    bbandsWidthLocator,
    attrsLocator,
    bbandsLocator,
    scaleH,
    scaleW,
    transform,
    crosshairX,
    hideCrosshairY,
}) =>
    <LineChart
        hideCrosshairY={hideCrosshairY}
        crosshairX={crosshairX} 
        scaleW={scaleW}
        scaleH={scaleH}
        transform={transform}
        data={bbandsLocator(data)} 
        xValueLocator={xValueLocator}
        yValueLocator={bbandsWidthLocator}
        multiChart="sub"
        crosshair={true}
        xAxisAttr={{
            textAttr: {
                hide: true
            }
        }}
        yAxisAttr={{
            num: 5,
            format:yFormat 
        }}
        attrsLocator={attrsLocator}
    />

 BBandsWidthChart.defaultProps = {
    bbandsWidthLocator: d => d.width
 }

export default BBandsWidthChart;

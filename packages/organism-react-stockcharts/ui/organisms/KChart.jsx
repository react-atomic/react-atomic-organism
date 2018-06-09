import React, {createElement} from 'react';
import {LineChart} from 'organism-react-d3-axis-chart';
import get from 'get-object-value';

import overlays from '../organisms/KChartOverlays';
import yFormat from '../../src/yFormat';

const keys = Object.keys;
const KChart = props => {

/*For easy copy porps to other overlay*/
const {
    areaY0Locator,
    areaY1Locator,
    children,
    xValueLocator,
    yValueLocator,
    linesValuesLocator,
    linesLocator,
    threshold,
    data,
    hideAxis,
    kChartOverlays,
    tradeRowsLocator,
    tradeHighLocator,
    tradeLowLocator,
    tradeOpenLocator,
    tradeCloseLocator,
    tradeDateLocator,
    areasValuesLocator,
    areasLocator,
    ...others,
} = props;

return (
<LineChart
    {...others}
    xValueLocator={xValueLocator}
    yValueLocator={yValueLocator}
    valuesLocator={linesValuesLocator}
    threshold={threshold}
    data={linesLocator(data)} 
    hideAxis={hideAxis}
    xAxisAttr={{
        textAttr: {
            hide: true
        }
    }}
    yAxisAttr={{
        format:yFormat 
    }}
    multiChart="main"
    crosshair={true}
>
   {
    keys(kChartOverlays).map( key => {
        return (
           createElement(
            overlays[key],
            {
                key,
                ...props,
                ...kChartOverlays[key],
            }
           ) 
       );
    })
   }
   {children}
</LineChart>
);
}

KChart.defaultProps = {
   hideAxis: false, 
   areasValuesLocator: d => d.values,
   linesValuesLocator: d => d.values,
   linesLocator: d => d.lines,
   areasLocator: d => d.areas,
   multiChart: 'main',
   kChartOverlays: {
        areas: {},
        candlesticks: {},
   },  
};

export default KChart;

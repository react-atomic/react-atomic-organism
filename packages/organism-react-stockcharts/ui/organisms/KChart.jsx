import React, {createElement} from 'react';
import {LineChart} from 'organism-react-d3-axis-chart';
import get from 'get-object-value';
import arrayMinMax from 'array.min.max';

import overlays from '../organisms/KChartOverlays';
import KChartText from '../organisms/KChartText';
import yFormat from '../../src/yFormat';

const keys = Object.keys;
const KChart = props => {

/*For easy copy porps to other overlay*/
const {
    children,

    // lines
    linesLocator,
    linesValuesLocator,
    xValueLocator,
    yValueLocator,

    // areas
    areasLocator,
    areasValuesLocator,
    areaY0Locator,
    areaY1Locator,

    thresholds,
    data,
    hideAxis,
    kChartOverlays,
    tradeRowsLocator,
    tradeDateLocator,
    tradeOpenLocator,
    tradeHighLocator,
    tradeLowLocator,
    tradeCloseLocator,
    tradeVolumeLocator,
    ...others,
} = props;
let {areaXLocator} = props;

if (!areaXLocator) {
    areaXLocator = xValueLocator;
}

const oMinMax = new arrayMinMax();
const lines = linesLocator(data);
if (lines && lines.length) {
    lines.forEach( line =>
        oMinMax.process(yValueLocator)(linesValuesLocator(line))
    );
}
const areas = areasLocator(data);
if (areas && areas.length) {
    areas.forEach( area => {
        const areasValues = areasValuesLocator(area);
        oMinMax.process(areaY0Locator)(areasValues)
        oMinMax.process(areaY1Locator)(areasValues)
    });
}
const trades = tradeRowsLocator(data)
if (trades && trades.length) {
    trades.forEach( trade => {
        oMinMax.process()([
            tradeHighLocator(trade),
            tradeLowLocator(trade)
        ])
    })
}

return (
<LineChart
    {...others}
    xValueLocator={xValueLocator}
    yValueLocator={yValueLocator}
    valuesLocator={linesValuesLocator}
    thresholds={thresholds}
    data={linesLocator(data)} 
    hideAxis={hideAxis}
    xAxisAttr={{
        textAttr: {
            hide: true
        }
    }}
    yAxisAttr={{
        format:yFormat,
        data: oMinMax.toArray()
    }}
    multiChart="main"
>
   {
    keys(kChartOverlays).map( key => {
        return (
           createElement(
            overlays[key],
            {
                key,
                areaXLocator,
                ...props,
                ...kChartOverlays[key],
            }
           ) 
       );
    })
   }
   <KChartText {...props} />
   {children}
</LineChart>
);
}

KChart.defaultProps = {
   hideAxis: false, 
   xValueLocator: d => d.x,
   yValueLocator: d => d.y,
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

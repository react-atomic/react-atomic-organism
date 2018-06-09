import React, {createElement} from 'react';
import {LineChart, MultiHArea, MultiCandlestick} from 'organism-react-d3-axis-chart';
import yFormat from '../../src/yFormat';
import get from 'get-object-value';

const keys = Object.keys;

const AreasOverLay = ({
    areasValuesLocator,
    xValueLocator,
    areaY0Locator,
    areaY1Locator,
    data
}) =>
(!areasValuesLocator(data)) ? null :
    <MultiHArea
        valuesLocator={areasValuesLocator}
        xValueLocator={xValueLocator}
        areaY0Locator={areaY0Locator}
        areaY1Locator={areaY1Locator}
        data={data}
    />

const CandlestickOverlay = ({
    data,
    xValueLocator,
    tradeRowsLocator,
    tradeHighLocator,
    tradeLowLocator,
    tradeOpenLocator,
    tradeCloseLocator
}) =>
(!tradeRowsLocator(data)) ? null :
    <MultiCandlestick
        data={data}
        xValueLocator={xValueLocator}
        valuesLocator={tradeRowsLocator}
        tradeHighLocator={tradeHighLocator}
        tradeLowLocator={tradeLowLocator}
        tradeOpenLocator={tradeOpenLocator}
        tradeCloseLocator={tradeCloseLocator}
    />

const overlays = {
    areas: AreasOverLay,
    candlesticks: CandlestickOverlay
};

const KChart = props => {
const {
    children,
    kChartOverlays,
    xValueLocator,
    yValueLocator,
    linesValuesLocator,
    threshold,
    data,
    hideAxis,
    ...others,
} = props;
return (
<LineChart
    {...others}
    xValueLocator={xValueLocator}
    yValueLocator={yValueLocator}
    valuesLocator={linesValuesLocator}
    threshold={threshold}
    data={data} 
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
    keys(kChartOverlays).map(key=>
       createElement(
        overlays[key],
        {
            key,
            ...props,
            ...kChartOverlays[key]
        }
       ) 
    )
   }
   {children}
</LineChart>
);
}

KChart.defaultProps = {
   hideAxis: false, 
   areasValuesLocator: d => get(d, ['areas', 'values']),
   linesValuesLocator: d => get(d, ['lines', 'values']),
   multiChart: 'main',
   kChartOverlays: {
        areas: {},
        candlesticks: {},
   }  
};

export default KChart;

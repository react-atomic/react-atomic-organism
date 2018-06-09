import React from 'react';
import get from 'get-object-value';
import {
    MultiHArea,
    MultiCandlestick
} from 'organism-react-d3-axis-chart';

const AreasOverLay = ({
    areasLocator,
    areasValuesLocator,
    xValueLocator,
    areaY0Locator,
    areaY1Locator,
    data,
    ...others
}) =>
(!areasLocator(data)) ? null :
    <MultiHArea
        {...others}
        valuesLocator={areasValuesLocator}
        xValueLocator={xValueLocator}
        areaY0Locator={areaY0Locator}
        areaY1Locator={areaY1Locator}
        data={areasLocator(data)}
    />

const CandlestickOverlay = ({
    data,
    tradeDateLocator,
    tradeRowsLocator,
    tradeHighLocator,
    tradeLowLocator,
    tradeOpenLocator,
    tradeCloseLocator,
    ...others
}) => {
return (
(!tradeRowsLocator(data)) ? null :
    <MultiCandlestick
        {...others}
        data={data}
        xValueLocator={tradeDateLocator}
        valuesLocator={tradeRowsLocator}
        tradeHighLocator={tradeHighLocator}
        tradeLowLocator={tradeLowLocator}
        tradeOpenLocator={tradeOpenLocator}
        tradeCloseLocator={tradeCloseLocator}
    />
)}

export default {
    areas: AreasOverLay,
    candlesticks: CandlestickOverlay
};

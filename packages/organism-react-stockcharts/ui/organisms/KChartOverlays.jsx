import React from 'react';
import get from 'get-object-value';
import {
    MultiHArea,
    MultiCandlestick,
} from 'organism-react-d3-axis-chart';

const AreasOverLay = ({
    areasLocator,
    areasValuesLocator,
    areaXLocator,
    areaY0Locator,
    areaY1Locator,
    data,
    ...others
}) =>
(!areasLocator(data)) ? null :
    <MultiHArea
        {...others}
        valuesLocator={areasValuesLocator}
        xValueLocator={areaXLocator}
        areaY0Locator={areaY0Locator}
        areaY1Locator={areaY1Locator}
        data={areasLocator(data)}
    />

const CandlestickOverlay = ({
    data,
    tradeRowsLocator,
    tradeDateLocator,
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

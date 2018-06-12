import React from 'react';
import {
    Text,
    Span
} from 'organism-react-d3-axis-chart';
import get from 'get-object-value';

const Label = props => <Span fill="#4682b4" dx="10" {...props} />
const Item = props => <Span {...props} />

const KChartText = ({
    data,
    xScale,
    crosshairX,
    tradeRowsLocator,
    tradeDateLocator,
    tradeOpenLocator,
    tradeHighLocator,
    tradeLowLocator,
    tradeCloseLocator,
    tradeVolumeLocator,
    i18nDate,
    i18nOpen,
    i18nHigh,
    i18nLow,
    i18nClose,
    i18nVolume,
}) =>
{
const index = xScale.scaler.invertIndex(crosshairX);
if (isNaN(index) || index < 0 ) {
    return null;
}
const indexData = get( tradeRowsLocator(data), [index]);
return (
<Text>
    <Label>{i18nDate}</Label>
    <Item>{tradeDateLocator(indexData)}</Item>
    <Label>{i18nOpen}</Label>
    <Item>{tradeOpenLocator(indexData)}</Item>
    <Label>{i18nHigh}</Label>
    <Item>{tradeHighLocator(indexData)}</Item>
    <Label>{i18nLow}</Label>
    <Item>{tradeLowLocator(indexData)}</Item>
    <Label>{i18nClose}</Label>
    <Item>{tradeCloseLocator(indexData)}</Item>
    <Label>{i18nVolume}</Label>
    <Item>{tradeVolumeLocator(indexData)}</Item>
</Text>
);
}

KChartText.defaultProps = {
    i18nDate: 'D:',
    i18nOpen: 'O:',
    i18nHigh: 'H:',
    i18nLow: 'L:',
    i18nClose: 'C:',
    i18nVolume: 'V:',
};

export default KChartText;

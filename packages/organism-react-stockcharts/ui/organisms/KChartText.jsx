import React from 'react';
import {
    Text,
    Span
} from 'organism-react-d3-axis-chart';
import get from 'get-object-value';

const Item = ({dx, dy, x, labelColor, color, header, text}) => 
([
    <Span 
        key="header"
        fill={labelColor}
        x={x}
        dx={dx}
        dy={dy}
    >
        {header}
    </Span>,
    <Span key="text" fill={color}>
        {text}
    </Span>
])

const KChartText = ({
    data,
    xScale,
    crosshairX,
    labelColor,
    color,
    vertical,
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
    style,
}) =>
{
const index = xScale.scaler.invertIndex(crosshairX);
if (isNaN(index) || index < 0 ) {
    return null
}
const indexData = get( tradeRowsLocator(data), [index]);
if (!indexData) {
    return null
}
const itemProps = {
    labelColor,
    color,
    dx: 10
}
const newLineProps = {}
if (vertical) {
    newLineProps.dy = 20 
    newLineProps.x = 0 
}

return (
<Text style={style} className="kchart-text">
    <Item
        {...itemProps}
        header={i18nDate}
        text={tradeDateLocator(indexData)}
    />
    <Item
        {...itemProps}
        header={i18nOpen}
        text={tradeOpenLocator(indexData)}
    />
    <Item
        {...itemProps}
        header={i18nHigh}
        text={tradeHighLocator(indexData)}
    />
    <Item
        {...itemProps}
        header={i18nLow}
        text={tradeLowLocator(indexData)}
    />
    <Item
        {...itemProps}
        {...newLineProps}
        header={i18nClose}
        text={tradeCloseLocator(indexData)}
    />
    <Item
        {...itemProps}
        header={i18nVolume}
        text={tradeVolumeLocator(indexData)}
    />
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
    vertical: false,
    labelColor: '#4682b4',
    color: '#000',
    style: {fontSize: 12}
};

export default KChartText;

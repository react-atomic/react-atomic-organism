import React, {PureComponent, createElement} from 'react';
import { MultiChart } from 'organism-react-d3-axis-chart';
import get from 'get-object-value';
import {mixClass, lazyInject} from 'react-atomic-molecule';

import KChart from '../organisms/KChart';
import VolumeChart from '../organisms/VolumeChart';



class StockChart extends PureComponent
{
    state = {};
    static defaultProps = { 
        scaleW: 500,
        scaleH: 500,
        tradeRowsLocator: d => d.trades,
        tradeHighLocator: d => d.h,
        tradeLowLocator: d => d.l,
        tradeOpenLocator: d => d.o,
        tradeCloseLocator: d => d.c,
        tradeVolumeLocator: d => d.v,
        tradeDateLocator: d => d.t,
        avgsLocator: d => d.avgs,
        bbandsLocator: d => d.bbands,
        defaultAttrs: {
            close: {
                stroke: '#9ecae1',
            },
            short: {
                stroke: '#1947a3',
            },
            long: {
                stroke: '#f56f0a',
            },
            quarter: {
                stroke: '#ce6dbd',
            },
            bbands1: {
                fill: '#f06292'
            },
            bbands2: {
            },
        }
    };

    constructor(props)
    {
        super(props);
        injects = lazyInject( injects, InjectStyles );
    }

    render()
    {
        const {
            data,
            scaleW,
            scaleH,
            threshold,
            hideAxis,
            tradeRowsLocator,
            tradeHighLocator,
            tradeLowLocator,
            tradeOpenLocator,
            tradeCloseLocator,
            tradeVolumeLocator,
            tradeDateLocator,
            avgsLocator,
            bbandsLocator,
            ...props
        } = this.props;
        return (
        <MultiChart
            scaleW={scaleW}
            scaleH={scaleH}
            className="stock-chart"
            //  Init XAxis
            data={tradeRowsLocator(data)}
            valuesLocator={d => d}
            xValueLocator={tradeDateLocator}
        >
           <KChart 
                data={{
                    ...data,
                    lines: avgsLocator(data),
                    areas: bbandsLocator(data)
                }}
                xValueLocator={d=>d.x}
                yValueLocator={d=>d.y}
                areaY0Locator={d=>d.upper}
                areaY1Locator={d=>d.lower}
                tradeRowsLocator={tradeRowsLocator}
                tradeHighLocator={tradeHighLocator}
                tradeLowLocator={tradeLowLocator}
                tradeOpenLocator={tradeOpenLocator}
                tradeCloseLocator={tradeCloseLocator}
                tradeDateLocator={tradeDateLocator}
           />
           <VolumeChart
                data={tradeRowsLocator(data)}
                xValueLocator={tradeDateLocator} 
                yValueLocator={tradeVolumeLocator}
                valuesLocator={d => d}
                tradeOpenLocator={tradeOpenLocator}
                tradeCloseLocator={tradeCloseLocator}
           />
        </MultiChart>
        );
    }
}

export default StockChart;

let injects;
const InjectStyles = {
    negativeRect: [
        {
            fill: '#a3c293'
        },
        '.stock-chart rect.negative'
    ],
    negativeLine: [
        {
            stroke: '#a3c293'
        },
        '.stock-chart line.negative'
    ],
    positiveRect: [ 
        {
            fill: '#9f3a38'
        },
        '.stock-chart rect.positive, .stock-chart rect.neutral'
    ],
    positiveLine: [ 
        {
            stroke: '#9f3a38'
        },
        '.stock-chart line.positive, .stock-chart line.neutral'
    ]
};

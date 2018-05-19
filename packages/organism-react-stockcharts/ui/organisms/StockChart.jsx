import React, {Component} from 'react';
import {LineChart, BarChart, MultiChart} from 'organism-react-d3-axis-chart';
import get from 'get-object-value';
import {indicatorMovingAverage, indicatorBollingerBands} from 'd3fc-technical-indicator';

import KChart from '../organisms/KChart';
import VolumeChart from '../organisms/VolumeChart';

const keys = Object.keys;

const bindX = raws => xLocator => isset => callback => values =>
{
    const result = [];
    raws.forEach((raw, key) => {
        const v = values[key];
        if (!isset(v)) {
            return;
        }
        const cbValue = callback(v);
        result.push({
            x: xLocator(raw),
            ...cbValue
        });
    });
    return result;
}

class StockChart extends Component
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
        short: 5,
        long: 13,
        quarter: 34,
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

    static getDerivedStateFromProps(nextProps, prevState)
    {
        const {
            data,
            defaultAttrs,
            tradeRowsLocator,
            tradeDateLocator,
            tradeCloseLocator
        } = nextProps;
        const rows = tradeRowsLocator(data);
        const allClose = [];
        rows.forEach( row => {
           allClose.push(tradeCloseLocator(row)); 
        } );
        const avgKeys = ['short', 'long', 'quarter'];
        const thisBindX = bindX(rows)(tradeDateLocator);
        const avgBindX = thisBindX(v=>!!v)(v=>({y: v}));
        const avgs = [{values: avgBindX(allClose), attrs: defaultAttrs.close}];
        const avgValues = {};
        avgKeys.forEach( key => {
            const indicator = indicatorMovingAverage().period(nextProps[key]); 
            avgValues[key] = indicator(allClose);
            avgs.push(
                {
                    values: avgBindX(avgValues[key]),
                    attrs: defaultAttrs[key]
                }
            );
        });
        const bbandsBindX = thisBindX(v=>!!v['upper'])(v=>({...v}));
        const bbands2 = indicatorBollingerBands().period(nextProps['long']);
        const bbands1 = indicatorBollingerBands().period(nextProps['long']).multiplier(1);
        const bbands = [
            {
                values: bbandsBindX(bbands1(allClose)),
                attrs: defaultAttrs['bbands1']
            },
            {
                values: bbandsBindX(bbands2(allClose)),
                attrs: defaultAttrs['bbands2']
            }
        ];
        return {
            avgs, bbands
        };
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
            ...props
        } = this.props;
        const {avgs, bbands} = this.state;
        return (
        <MultiChart
            scaleW={scaleW}
            scaleH={scaleH}
            //  Init XAxis
            data={tradeRowsLocator(data)}
            valuesLocator={d => d}
            xValueLocator={tradeDateLocator}
        >
           <KChart 
                data={{
                    lines: avgs,
                    areas: bbands
                }}
                linesLocator={d=>d.lines}
                linesValuesLocator={d=>d.values}
                xValueLocator={d=>d.x}
                yValueLocator={d=>d.y}
                areasLocator={d=>d.areas}
                areasValuesLocator={d=>d.values}
                areaY0Locator={d=>d.upper}
                areaY1Locator={d=>d.lower}
           /> 
           <VolumeChart
                data={tradeRowsLocator(data)}
                xValueLocator={tradeDateLocator} 
                yValueLocator={tradeVolumeLocator}
                valuesLocator={d => d}
           />
        </MultiChart>
        );
    }
}

export default StockChart;

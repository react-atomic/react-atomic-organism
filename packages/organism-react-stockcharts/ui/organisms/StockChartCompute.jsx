import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {indicatorMovingAverage, indicatorBollingerBands} from 'd3fc-technical-indicator';

import StockChart from '../organisms/StockChart';

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

class StockChartCompute extends PureComponent
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
        if (!rows) {
            return null;
        }
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
            kChart,
            ...props
        } = this.props;
        const {avgs, bbands} = this.state;
        const chartData = {
            avgs,
            bbands,
            raw: data
        }
        return (
            <StockChart
                {...props}
                data={chartData}
                tradeRowsLocator={d => get(d, ['raw', 'trades'])}
                kChart={{
                   areaY0Locator: d => d.upper,
                   areaY1Locator: d => d.lower,
                   ...kChart
                }}
            />
        );
    }
}

export default StockChartCompute;

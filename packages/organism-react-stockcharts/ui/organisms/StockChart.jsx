import React, { PureComponent, createElement } from "react";
import { MultiChart } from "organism-react-d3-axis-chart";
import get from "get-object-value";
import { lazyInject } from "react-atomic-molecule";

import KChart from "../organisms/KChart";
import VolumeChart from "../organisms/VolumeChart";
import BBandsWidthChart from "../organisms/BBandsWidthChart";

const keys = Object.keys;
const charts = {
  bbandsWidthChart: BBandsWidthChart,
};

class StockChart extends PureComponent {
  static defaultProps = {
    scaleW: 500,
    scaleH: 500,
    tradeRowsLocator: (d) => d.trades,
    tradeHighLocator: (d) => d.h,
    tradeLowLocator: (d) => d.l,
    tradeOpenLocator: (d) => d.o,
    tradeCloseLocator: (d) => d.c,
    tradeVolumeLocator: (d) => d.v,
    tradeDateLocator: (d) => d.t,
    avgsLocator: (d) => d.avgs,
    bbandsLocator: (d) => d.bbands,
    kChart: {},
    subCharts: {},
  };

  constructor(props) {
    super(props);
    injects = lazyInject(injects, InjectStyles);
  }

  render() {
    const {
      data,
      scaleW,
      scaleH,
      threshold,
      hideAxis,
      kChart,
      kChartOverlays,
      subCharts,
      thresholds,
      tradeRowsLocator,
      tradeHighLocator,
      tradeLowLocator,
      tradeOpenLocator,
      tradeCloseLocator,
      tradeVolumeLocator,
      tradeDateLocator,
      avgsLocator,
      bbandsLocator,
      autoScale,
      onClick,
      transform,
      xAxisAttr,
      yAxisAttr,
      color,
      invertedColor,
      ...props
    } = this.props;
    return (
      <MultiChart
        autoScale={autoScale}
        crosshair={true}
        onClick={onClick}
        scaleW={scaleW}
        scaleH={scaleH}
        transform={transform}
        className="stock-chart"
        //  Init XAxis
        data={tradeRowsLocator(data)}
        valuesLocator={(d) => d}
        xValueLocator={tradeDateLocator}
      >
        <KChart
          data={{
            ...data,
            lines: avgsLocator(data),
            areas: bbandsLocator(data),
          }}
          tradeRowsLocator={tradeRowsLocator}
          tradeHighLocator={tradeHighLocator}
          tradeLowLocator={tradeLowLocator}
          tradeOpenLocator={tradeOpenLocator}
          tradeCloseLocator={tradeCloseLocator}
          tradeDateLocator={tradeDateLocator}
          tradeVolumeLocator={tradeVolumeLocator}
          kChartOverlays={kChartOverlays}
          thresholds={thresholds}
          xAxisAttr={xAxisAttr}
          yAxisAttr={yAxisAttr}
          color={color}
          invertedColor={invertedColor}
          {...kChart}
        />
        {keys(subCharts).map((key) => {
          return createElement(charts[key], {
            key,
            multiChart: "sub",
            color,
            invertedColor,
            xAxisAttr,
            yAxisAttr,
            ...this.props,
            ...subCharts[key],
          });
        })}
        <VolumeChart
          data={tradeRowsLocator(data)}
          xValueLocator={tradeDateLocator}
          yValueLocator={tradeVolumeLocator}
          valuesLocator={(d) => d}
          tradeOpenLocator={tradeOpenLocator}
          tradeCloseLocator={tradeCloseLocator}
          xAxisAttr={xAxisAttr}
          yAxisAttr={yAxisAttr}
          color={color}
          invertedColor={invertedColor}
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
      fill: "#a3c293",
    },
    ".stock-chart rect.negative",
  ],
  negativeLine: [
    {
      stroke: "#a3c293",
    },
    ".stock-chart line.negative",
  ],
  positiveRect: [
    {
      fill: "#9f3a38",
    },
    ".stock-chart rect.positive, .stock-chart rect.neutral",
  ],
  positiveLine: [
    {
      stroke: "#9f3a38",
    },
    ".stock-chart line.positive, .stock-chart line.neutral",
  ],
};

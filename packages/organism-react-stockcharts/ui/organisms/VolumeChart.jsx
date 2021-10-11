import React from "react";
import { BarChart, resetProps } from "organism-react-d3-axis-chart";
import { mixClass } from "react-atomic-molecule";

import yFormat from "../../src/yFormat";

const VolumesAttrsLocator = (openLocator) => (closeLocator) => (d) => {
  const open = openLocator(d);
  const close = closeLocator(d);
  const className = mixClass({
    positive: close > open,
    negative: close < open,
    neutral: close === open,
  });
  return { className };
};

const VolumeChart = ({
  tradeRowsLocator,
  tradeOpenLocator,
  tradeCloseLocator,
  xAxisAttr,
  yAxisAttr,
  data,
  ...props
}) => {
  return (
    <BarChart
      {...resetProps(props)}
      mainChartDataLocator={tradeRowsLocator}
      data={data}
      xAxisAttr={{
        textRotate: -45,
        ...xAxisAttr,
      }}
      yAxisAttr={{
        num: 3,
        format: yFormat,
        ...yAxisAttr,
      }}
      hideCrosshairXLabel={true}
      attrsLocator={VolumesAttrsLocator(tradeOpenLocator)(tradeCloseLocator)}
    />
  );
};

export default VolumeChart;

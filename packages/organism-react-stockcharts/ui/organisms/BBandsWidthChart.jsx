import React from "react";
import { LineChart, resetProps } from "organism-react-d3-axis-chart";
import yFormat from "../../src/yFormat";

const BBandsWidthChart = ({
  data,
  xValueLocator,
  bbandsWidthLocator,
  attrsLocator,
  bbandsLocator,
  ...others
}) => (
  <LineChart
    {...resetProps(others)}
    data={bbandsLocator(data)}
    xValueLocator={xValueLocator}
    yValueLocator={bbandsWidthLocator}
    xAxisAttr={{
      textAttr: {
        hide: true,
      },
    }}
    yAxisAttr={{
      num: 5,
      format: yFormat,
    }}
    attrsLocator={attrsLocator}
  />
);

BBandsWidthChart.defaultProps = {
  bbandsWidthLocator: (d) => d.width,
};

export default BBandsWidthChart;

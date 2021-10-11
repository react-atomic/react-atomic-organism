import React, { cloneElement, Children } from "react";
import { mergeChildren } from "react-atomic-molecule";

import MultiLine from "../molecules/MultiLine";
import BaseAxisChart from "../molecules/BaseAxisChart";

const LineChart = (props) => (
  <BaseAxisChart {...props} className="line-chart">
    {mergeChildren(<MultiLine data={props.data} />, props.children)}
  </BaseAxisChart>
);

export default LineChart;

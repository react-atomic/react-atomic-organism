import React, { cloneElement, Children } from "react";
import { mergeChildren } from "react-atomic-molecule";
import get from "get-object-value";

import MultiRect from "../molecules/MultiRect";
import BaseAxisChart from "../molecules/BaseAxisChart";

const heightCallback = (scaleH) => (d, x, y) => {
  return scaleH - y;
};

const BarChart = (props) => {
  const {
    data,
    valuesLocator = (d) => d.values,
    attrsLocator = (d) => ({ fill: "#4682B4" }),
    mainChartDataLocator = (d) => get(d, [0], {}),
  } = props;
  const rectData = valuesLocator(mainChartDataLocator(data));
  return (
    <BaseAxisChart
      {...props}
      attrsLocator={attrsLocator}
      mainChartDataLocator={mainChartDataLocator}
      className="bar-chart"
    >
      {mergeChildren(
        <MultiRect
          data={rectData}
          attrsLocator={attrsLocator}
          heightCallback={heightCallback}
        />,
        props.children
      )}
    </BaseAxisChart>
  );
};

export default BarChart;

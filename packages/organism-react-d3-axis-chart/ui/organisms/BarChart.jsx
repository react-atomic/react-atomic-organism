import React, { cloneElement, Children } from "react";
import get from "get-object-value";

import MultiRect from "../molecules/MultiRect";
import BaseChart from "../molecules/BaseChart";

const BarChart = ({
  children,
  data,
  attrsLocator,
  valuesLocator,
  xValueLocator,
  yValueLocator,
  ...others
}) =>
  !valuesLocator(data) ? null : (
    <BaseChart
      {...others}
      data={[data]}
      valuesLocator={valuesLocator}
      xValueLocator={xValueLocator}
      yValueLocator={yValueLocator}
    >
      {(baseChart) => [
        <MultiRect
          {...{
            ...baseChart,
            attrsLocator,
            valuesLocator,
            xValueLocator,
            yValueLocator,
            data,
            heightCallback: (d, x, y) => {
              const { scaleH } = baseChart;
              return scaleH - y;
            },
          }}
        />,
        Children.map(children, (c) =>
          !c
            ? null
            : cloneElement(c, {
                ...baseChart,
              })
        ),
      ]}
    </BaseChart>
  );

BarChart.defaultProps = {
  data: [],
  xValueLocator: (d) => d.x,
  yValueLocator: (d) => d.y,
  valuesLocator: (d) => d.values,
  attrsLocator: (d) => ({ fill: "#4682B4" }),
};

export default BarChart;

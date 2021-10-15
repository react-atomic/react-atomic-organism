import React from "react";
import { mixClass, mergeChildren } from "react-atomic-molecule";

import MultiHArea from "../molecules/MultiHArea";
import BaseAxisChart from "../molecules/BaseAxisChart";

const yScaleMore = [0];

const AreaChart = (props) => {
  const {
    curve = true,
    areaY1Locator = () => 0,
    data,

    /*base props*/
    yValueLocator = (d) => d.y,
  } = props;

  return (
    <BaseAxisChart
      {...props}
      className={mixClass("area-chart", props.ClassName)}
    >
      {mergeChildren(
        <MultiHArea
          data={data}
          areaY0Locator={yValueLocator}
          areaY1Locator={areaY1Locator}
          curve={curve}
        />,
        props.children
      )}
    </BaseAxisChart>
  );
};

export default AreaChart;

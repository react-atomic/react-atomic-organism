import React from "react";

import MultiHArea from "../molecules/MultiHArea";
import BaseAxisChart from "../molecules/BaseAxisChart";

const yScaleMore = [0];

const AreaChart = (props) => {
  const {
    curve = true,
    areaY1Locator = () => 0,

    /*base props*/
    xValueLocator,
    yValueLocator = (d) => d.y,
    children,
    data,
    valuesLocator,
    attrsLocator,
    ...others
  } = props;

  return (
    <BaseAxisChart {...props}>
      <MultiHArea
        xValueLocator={xValueLocator}
        areaY0Locator={yValueLocator}
        areaY1Locator={areaY1Locator}
        data={data}
        valuesLocator={valuesLocator}
        attrsLocator={attrsLocator}
        curve={curve}
      />
    </BaseAxisChart>
  );
};

export default AreaChart;

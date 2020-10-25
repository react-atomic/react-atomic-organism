import React from "react";

import MultiHArea from "../molecules/MultiHArea";
import BaseChartClass from "../molecules/BaseChartClass";

const yScaleMore = [0];

class AreaChart extends BaseChartClass {
  static defaultProps = {
    areaY1Locator: () => 0,
    yValueLocator: (d) => d.y,
  };

  baseChartProps() {
    return {
      yScaleMore,
    };
  }

  renderChart(baseChart) {
    const {
      areaY1Locator,

      /*base props*/
      xValueLocator,
      yValueLocator,
      children,
      data,
      valuesLocator,
      attrsLocator,
      ...others
    } = this.props;
    return (
      <MultiHArea
        {...{
          ...baseChart,
          xValueLocator,
          areaY0Locator: yValueLocator,
          areaY1Locator,
          data,
          valuesLocator,
          attrsLocator,
          curve: true,
        }}
      />
    );
  }
}

export default AreaChart;

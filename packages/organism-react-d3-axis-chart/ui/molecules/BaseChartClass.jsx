import React, { Component, cloneElement, Children } from "react";
import BaseChart from "../molecules/BaseChart";

class BaseChartClass extends Component {
  getXScale() {
    return this.chart.getXScale();
  }

  getYScale() {
    return this.chart.getYScale();
  }

  getCrosshairX() {
    return this.chart.getCrosshairX();
  }

  baseChartProps() {
    return {};
  }

  renderChart() {
    console.error("You should override renderChart");
    return null;
  }

  render() {
    const {
      /*remove props*/
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
    if (!data) {
      return null;
    } else {
      return (
        <BaseChart
          ref={(el) => (this.chart = el)}
          {...this.baseChartProps()}
          {...others}
          data={data}
          valuesLocator={valuesLocator}
          xValueLocator={xValueLocator}
          yValueLocator={yValueLocator}
        >
          {(baseChart) => {
            return [
              this.renderChart(baseChart),
              Children.map(children, (c) =>
                !c
                  ? null
                  : cloneElement(c, {
                      ...baseChart,
                    })
              ),
            ];
          }}
        </BaseChart>
      );
    }
  }
}

export default BaseChartClass;

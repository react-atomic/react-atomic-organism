import React, {cloneElement, Children} from 'react';

import MultiHArea from '../molecules/MultiHArea';
import BaseChart from '../molecules/BaseChart';

const yScaleMore = [0];

const AreaChart = ({
  xValueLocator,
  yValueLocator,
  areaY0Locator,
  areaY1Locator,
  children,
  data,
  valuesLocator,
  attrsLocator,
  ...others
}) =>
  !data ? null : (
    <BaseChart
      {...others}
      data={data}
      yScaleMore={yScaleMore}
      valuesLocator={valuesLocator}
      xValueLocator={xValueLocator}
      yValueLocator={yValueLocator || areaY0Locator}>
      {baseChart => {
        return [
          <MultiHArea
            {...{
              ...baseChart,
              xValueLocator,
              areaY0Locator: yValueLocator || areaY0Locator,
              areaY1Locator,
              data,
              valuesLocator,
              attrsLocator,
              curve: true,
            }}
          />,
          Children.map(children, c =>
            !c
              ? null
              : cloneElement(c, {
                  ...baseChart,
                }),
          ),
        ];
      }}
    </BaseChart>
  );

AreaChart.defaultProps = {
  areaY1Locator: () => 0,
  yValueLocator: d => d.y,
};

export default AreaChart;

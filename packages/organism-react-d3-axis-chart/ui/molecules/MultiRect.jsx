import React from "react";

import Rect from "../molecules/Rect";
import Group from "../molecules/Group";

const MultiRect = ({
  data,
  heightCallback,
  xScale,
  yScale,
  xValueLocator,
  yValueLocator,
  valuesLocator,
  attrsLocator,
  scaleH,
}) => (
  <Group className="data-group barchart">
    {valuesLocator(data).map((d, key) => {
      const x = xScale.scaler(xValueLocator(d));
      const y = yScale.scaler(yValueLocator(d));
      const attrs = attrsLocator(d, x, y);
      return (
        <Rect
          key={key}
          x={x}
          y={y}
          width={xScale.length}
          height={heightCallback(d, x, y)}
          {...attrs}
        />
      );
    })}
  </Group>
);

MultiRect.defaultProps = {
  valuesLocator: (d) => d.values,
  attrsLocator: (d) => d.attrs,
};

export default MultiRect;

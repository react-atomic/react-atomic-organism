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
  allDataLocator,
  attrsLocator,
  scaleH,
}) => {
  const getHeightByScale = heightCallback(scaleH);
  return (
    <Group className="data-group multi-rect">
      {allDataLocator(data).map((d, key) => {
        const x = xScale.scaler(xValueLocator(d));
        const y = yScale.scaler(yValueLocator(d));
        const attrs = attrsLocator(d, x, y);
        return (
          <Rect
            key={key}
            x={x}
            y={y}
            width={xScale.length}
            height={getHeightByScale(d, x, y)}
            {...attrs}
          />
        );
      })}
    </Group>
  );
};

export default MultiRect;

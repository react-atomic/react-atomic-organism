import React from "react";

import Area from "../molecules/Area";
import Group from "../molecules/Group";

const MultiHArea = ({
  xValueLocator,
  areaY0Locator = (d) => d.y0,
  areaY1Locator = (d) => d.y1,
  valuesLocator,
  allDataLocator,
  attrsLocator,
  xScale,
  yScale,
  data,
  curve,
  d3,
}) => (
  <Group className="data-group multi-harea">
    {allDataLocator(data).map((area, key) => {
      const attr = attrsLocator(area);
      const d = d3.hArea(
        valuesLocator(area),
        (d) => xScale.scaler(xValueLocator(d)) + xScale.length / 2,
        (d) => yScale.scaler(areaY0Locator(d)),
        (d) => yScale.scaler(areaY1Locator(d)),
        curve
      );
      return <Area d={d} key={key} {...attr} />;
    })}
  </Group>
);

export default MultiHArea;

import React from "react";

import Line from "../molecules/Line";
import Group from "../molecules/Group";

const MultiLine = ({
  data,
  valuesLocator,
  xValueLocator,
  yValueLocator,
  attrsLocator,
  allDataLocator,
  xScale,
  yScale,
  d3,
}) => (
  <Group className="data-group multi-line">
    {allDataLocator(data).map((line, key) => {
      const attr = attrsLocator(line);
      const d = d3.curve(
        valuesLocator(line),
        xValueLocator,
        yValueLocator,
        xScale,
        yScale
      );
      return <Line d={d} {...attr} key={key} />;
    })}
  </Group>
);

export default MultiLine;

import React from "react";
import { useD3 } from "d3-lib";
import get from "get-object-value";

import Group from "../molecules/Group";
import Path from "../molecules/Path";

const Arc = (props) => {
  const {
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    children,
    groupProps,
    onD3Load,
    ...otherProps
  } = props;

  const [isLoad, d3] = useD3(onD3Load);

  if (!isLoad) {
    return null;
  }

  const angleData = [{ startAngle, endAngle }];
  const data = d3.arc(angleData, innerRadius, outerRadius, cornerRadius);
  const d = get(data, ["items", 0, "path"]);

  return (
    <Group className="arc" {...groupProps}>
      <Path {...otherProps} d={d} />
      {children}
    </Group>
  );
};

export default Arc;

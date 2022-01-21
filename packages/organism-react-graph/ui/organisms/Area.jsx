import React, { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";
import { useD3 } from "d3-lib";

const Area = (props) => {
  const {
    atom = "path",
    fillOpacity = "0.1",
    stroke = "none",
    curve,
    data,
    xLocator,
    y0Locator,
    y1Locator,
    onD3Load,
    ...otherProps
  } = props;

  const [isLoad, d3] = useD3(onD3Load);
  if (!isLoad) {
    return null;
  }

  const d = d3.hArea(data, xLocator, y0Locator, y1Locator, curve);
  return (
    <SemanticUI
      atom={atom}
      fillOpacity={fillOpacity}
      stroke={stroke}
      ui={false}
      {...otherProps}
      d={d}
    />
  );
};

export default Area;

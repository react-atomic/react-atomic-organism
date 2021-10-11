import React, { memo } from "react";

import { SemanticUI } from "react-atomic-molecule";

const Area = (props) => {
  const {
    atom = "path",
    fill = "steelblue",
    fillOpacity = "0.1",
    stroke = "none",
    ...others
  } = props;
  return (
    <SemanticUI
      {...others}
      atom={atom}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke={stroke}
    />
  );
};

export default memo(Area);

import React, { memo } from "react";

import { SemanticUI } from "react-atomic-molecule";

const Area = (props) => <SemanticUI {...props} />;

Area.defaultProps = {
  atom: "path",
  fill: "steelblue",
  fillOpacity: "0.1",
  stroke: "none",
};

export default memo(Area);

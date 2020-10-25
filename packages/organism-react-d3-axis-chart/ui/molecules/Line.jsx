import React, { memo } from "react";
import { Line as GraphLine } from "organism-react-graph";

const Line = (props) => <GraphLine {...props} />;

Line.defaultProps = {
  fill: "none",
  stroke: "#3182bd",
};

export default memo(Line);

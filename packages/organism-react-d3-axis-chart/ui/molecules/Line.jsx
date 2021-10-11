import React, { memo } from "react";
import { Line as GraphLine } from "organism-react-graph";

const Line = memo((props) => {
  const { fill = "none", stroke = "#3182bd", ...others } = props;
  return <GraphLine {...others} fill={fill} stroke={stroke} />;
});

Line.displayName = "ChartLine";

export default Line;

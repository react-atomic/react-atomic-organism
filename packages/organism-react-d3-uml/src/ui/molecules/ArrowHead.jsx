//@ts-check

import { memo } from "react";
import { KEYS } from "reshow-constant";
import Path from "ricon/Path";

const ArrowHead = ({
  multi = { "": {} },
  id = "marker-arrow-head",
  viewBox = "0 0 10 10",
  d = "M 0 0 L 10 5 L 0 10 z",
  refX = 9,
  refY = 5,
  markerUnits = "strokeWidth",
  markerWidth = 8,
  markerHeight = 6,
  orient = "auto",
  fill = "#bbb",
}) => {
  return (
    <defs>
      {KEYS(multi).map((key) => {
        const thisid = id + key;
        return (
          <marker
            id={thisid}
            key={thisid}
            viewBox={viewBox}
            refX={refX}
            refY={refY}
            markerUnits={markerUnits}
            markerWidth={markerWidth}
            markerHeight={markerHeight}
            orient={orient}
            fill={fill}
            {...multi[key]}
          >
            <Path d={d} style={Styles.path} />
          </marker>
        );
      })}
    </defs>
  );
};

export default memo(ArrowHead);

const Styles = {
  path: {
    strokeWidth: 1,
    strokeDasharray: "1, 0",
  },
};

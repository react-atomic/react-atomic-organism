import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { SemanticUI } from "react-atomic-molecule";
import { useD3 } from "d3-lib";

const Line = forwardRef((props, ref) => {
  const lastCenter = useRef();

  const expose = {
    getCenter: () => lastCenter.current,
  };

  useImperativeHandle(ref, () => expose, []);

  const [isLoad, d3] = useD3();

  const { start, end, svgLine, curve, ...otherProps } = props;
  const params = {};
  if (start && end) {
    if (svgLine) {
      params.x1 = start.x;
      params.y1 = start.y;
      params.x2 = end.x;
      params.y2 = end.y;
    } else {
      if (!isLoad) {
        return null;
      }
      const { center, d } = d3.line(start, end, curve);
      params.d = d;
      lastCenter.current = center;
    }
  }
  params.atom = svgLine ? "line" : "path";
  return <SemanticUI ui={false} {...otherProps} {...params} />;
});

Line.displayName = "Line";

export default Line;

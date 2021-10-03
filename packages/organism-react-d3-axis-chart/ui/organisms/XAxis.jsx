import React, { createElement } from "react";

import Axis from "../molecules/Axis";
import XAxisLabel from "../organisms/XAxisLabel";

const XAxis = ({
  length,
  height,
  textRotate = -90,
  transform,
  textAttr,
  lineAttr,
  ...props
}) => {
  const params = {
    path: `M0,1V0H${length}V1`,
    y: 0,
    lineAttr: {
      svgLine: true,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 6 },
      ...lineAttr,
    },
    crosshairLabel: <XAxisLabel />,
    className: "x-axis",
    ...props,
  };

  if ("undefined" === typeof transform && height) {
    params.transform = `translate(0, ${height})`;
  }

  let thisTextAttr;
  if (textRotate) {
    thisTextAttr = {
      x: 0,
      y: 9,
      dx: "-.8em",
      dy: "-.55em",
      transform: `rotate(${textRotate})`,
      style: {
        textAnchor: "end",
      },
      ...textAttr,
    };
  } else {
    thisTextAttr = {
      y: 20,
      style: {
        textAnchor: "middle",
      },
      ...textAttr,
    };
  }
  params.textAttr = thisTextAttr;
  return createElement(Axis, params);
};

export default XAxis;

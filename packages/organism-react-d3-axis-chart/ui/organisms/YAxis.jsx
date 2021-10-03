import React from "react";
import {round} from "to-percent-js";

import Axis from "../molecules/Axis";
import YAxisLabel from "../organisms/YAxisLabel";

const YAxis = ({ length, format=(v)=>round(v, 2), ...props }) => {
  return (
    <Axis
      className="y-axis"
      path={`M-1,0H0V${length}H-1`}
      x="0"
      format={format}
      textAttr={{
        dy: ".32em",
        x: -9,
        style: {
          textAnchor: "end",
        },
      }}
      lineAttr={{
        svgLine: true,
        start: { x: 0, y: 0 },
        end: { x: -6, y: 0 },
      }}
      crosshairLabel={<YAxisLabel />}
      {...props}
    />
  );
};

export default YAxis;

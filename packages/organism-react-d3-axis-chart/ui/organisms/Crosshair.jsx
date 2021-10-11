import React from "react";

import Line from "../molecules/Line";
import Group from "../molecules/Group";

const CrossLine = (props) => (
  <Line {...props} strokeWidth="3" strokeDasharray="5,5" />
);

const Crosshair = props => {
    const { x, y, scaleW, scaleH, hideX, hideY } = props;
    let xline = null;
    let yline = null;
    if (!hideX && y) {
      xline = (
        <CrossLine
          className="x"
          start={{ x: 0, y: y }}
          end={{ x: scaleW, y: y }}
        />
      );
    }
    if (!hideY && x) {
      yline = (
        <CrossLine
          className="y"
          start={{ x: x, y: 0 }}
          end={{ x: x, y: scaleH }}
        />
      );
    }
    return (
      <Group className="crosshair">
        {xline}
        {yline}
      </Group>
    );
}

export default Crosshair;

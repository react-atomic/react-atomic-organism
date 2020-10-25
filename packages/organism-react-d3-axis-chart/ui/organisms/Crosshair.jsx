import React, { Component } from "react";

import Line from "../molecules/Line";
import Group from "../molecules/Group";

const CrossLine = (props) => (
  <Line {...props} strokeWidth="3" strokeDasharray="5,5" />
);

class Crosshair extends Component {
  render() {
    const { x, y, scaleW, scaleH, hideX, hideY } = this.props;
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
}

export default Crosshair;

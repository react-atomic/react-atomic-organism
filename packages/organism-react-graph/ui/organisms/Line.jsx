import React, { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";
import { line } from "d3-lib";

class Line extends PureComponent {
  getCenter() {
    return this.center;
  }

  render() {
    const { start, end, svgLine, curve, ...props } = this.props;
    const params = {};
    if (start && end) {
      if (svgLine) {
        params.x1 = start.x;
        params.y1 = start.y;
        params.x2 = end.x;
        params.y2 = end.y;
      } else {
        const { center, d } = line(start, end, curve);
        params.d = d;
        this.center = center;
      }
    }
    params.atom = svgLine ? "line" : "path";
    return <SemanticUI ui={false} {...props} {...params} />;
  }
}

export default Line;

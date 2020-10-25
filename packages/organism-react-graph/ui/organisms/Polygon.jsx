import React, { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";

class Polygon extends PureComponent {
  render() {
    const props = this.props;
    return <SemanticUI atom="polygon" ui={false} {...props} />;
  }
}

export default Polygon;

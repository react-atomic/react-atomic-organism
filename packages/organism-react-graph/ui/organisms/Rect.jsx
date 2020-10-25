import React, { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";

class Rect extends PureComponent {
  render() {
    const props = this.props;
    return <SemanticUI atom="rect" ui={false} {...props} />;
  }
}

export default Rect;

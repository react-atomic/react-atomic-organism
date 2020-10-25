import React, { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";

class Circle extends PureComponent {
  render() {
    const props = this.props;
    return <SemanticUI atom="circle" ui={false} {...props} />;
  }
}

export default Circle;

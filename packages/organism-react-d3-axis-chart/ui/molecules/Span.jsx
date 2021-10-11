import React from "react";

import { SemanticUI } from "react-atomic-molecule";

const Span = (props) => {
  const {atom = "tspan", ...others} = props;
  return <SemanticUI {...others} atom={atom}/>;
}

export default Span;

import React from "react";

import { SemanticUI } from "react-atomic-molecule";

const Rect = (props) => {
  const {atom = "rect", ...others} = props;
  return <SemanticUI {...others} atom={atom}/>;
}

export default Rect;

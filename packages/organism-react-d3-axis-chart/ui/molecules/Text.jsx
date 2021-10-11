import React from "react";

import { SemanticUI } from "react-atomic-molecule";

const Text = (props) => {
  const {atom = "text", ...others} = props;
  return <SemanticUI {...others} atom={atom}/>;
}

export default Text;

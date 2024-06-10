import React from "react";
import { SemanticUI } from "react-atomic-molecule";

const Svg = ({ ui = false, atom = "svg", width = "100%", ...props }) => (
  <SemanticUI {...props} ui={ui} atom={atom} width={width} />
);

export default Svg;

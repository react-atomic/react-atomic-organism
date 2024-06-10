import React from "react";
import { SemanticUI } from "react-atomic-molecule";

const Path = ({ ui = false, atom = "path", ...props }) => (
  <SemanticUI {...props} ui={ui} atom={atom} />
);

export default Path;

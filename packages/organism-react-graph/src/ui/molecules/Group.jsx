import React from "react";
import { SemanticUI } from "react-atomic-molecule";

const Group = ({ ui = false, atom = "g", ...props }) => (
  <SemanticUI {...props} ui={ui} atom={atom} />
);

export default Group;

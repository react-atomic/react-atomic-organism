import React from "react";
import { SemanticUI } from "react-atomic-molecule";

const Group = (props) => <SemanticUI {...props} />;

Group.defaultProps = {
  atom: "g",
  ui: false,
};

export default Group;

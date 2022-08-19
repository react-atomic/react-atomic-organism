import React from "react";
import { Label } from "react-atomic-molecule";
import callfunc from "call-func";

const handleDel = (func) => (e) => {
  e.preventDefault();
  callfunc(func);
};

const Tag = ({ tag, group, children, onDel, ...props }) => {
  let numEl = null;
  if (group.num > 1) {
    numEl = `(${group.num})`;
  }
  return (
    <Label className="tiny" {...props} style={Styles.tag}>
      {children}
      {tag}
      {numEl}
      <button style={Styles.tagButton} onClick={handleDel(onDel)}>
        x
      </button>
    </Label>
  );
};

export default Tag;

const Styles = {
  tag: {
    margin: "0.678571em 0 0.678571em 1em",
    position: "relative",
    paddingRight: 25,
  },
  tagButton: {
    background: "none",
    border: "none",
    outline: "none",
    borderLeft: "1px solid rgba(0,0,0,0.3)",
    marginLeft: 3,
    position: "absolute",
    top: 0,
    height: "100%",
    cursor: "pointer",
  },
};

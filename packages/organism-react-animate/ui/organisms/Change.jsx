import React, { useRef, useState, useEffect, useMemo } from "react";
import callfunc from "call-func";
import Animate from "../organisms/Animate";

const Change = props => {
  const { children: propsChildren, onExited, ...otherProps } = props;
  const [children, setChildren] = useState(propsChildren);
  const mount = useRef(false);
  const nextChildren = useRef(false); 
  const handleExited = node => {
    if (mount.current) {
      setChildren(prevChildren => {
        if (!prevChildren) {
          return nextChildren.current;
        } else {
          callfunc(onExited, [node]);
          return prevChildren;
        }
      });
    }
  };
  useEffect(() => {
    mount.current = true;
    nextChildren.current = propsChildren;
    if (children !== propsChildren) {
      setChildren(null);
    }
    return () => {
      mount.current = false;
    };
  }, [propsChildren]);
  return useMemo(
    () => (
      <Animate {...otherProps} onExited={handleExited}>
        {children}
      </Animate>
    ),
    [children]
  );
};

export default Change;

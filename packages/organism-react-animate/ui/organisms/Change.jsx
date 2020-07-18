import React, { useRef, useState, useEffect, useMemo } from "react";
import callfunc from "call-func";
import Animate from "../organisms/Animate";

const Change = props => {
  const { children: propsChildren, onExited, onEntered, keyEqualer, ...otherProps } = props;
  const [children, setChildren] = useState(propsChildren);
  const mount = useRef(false);
  const nextChildren = useRef(propsChildren);
  const isRunning = useRef(false);
  const nextCall = useRef(false);

  const handleExited = (node, isAppear) => {
    if (mount.current && nextChildren.current) {
      setChildren(nextChildren.current);
      callfunc(onExited, [node, isAppear]);
    }
  };

  const handleEntered = (node, isAppear) => {
    isRunning.current = false;
    if (nextCall.current) {
      callfunc(nextCall.current);
    }
    setTimeout(() => mount.current && callfunc(onEntered, [node, isAppear]));
  };

  useEffect(() => {
    mount.current = true;
    const setNext = willChild => {
      const reset = () => {
        nextCall.current = () => setNext(willChild);
      };
      if (
        nextChildren.current !== willChild &&
        !keyEqualer(children, willChild)
      ) {
        if (willChild && !isRunning.current) {
          nextChildren.current = willChild;
          nextCall.current = false;
          setChildren(null);
          isRunning.current = true;
        } else {
          reset();
        }
      } else {
        reset();
      }
    };
    setNext(propsChildren);

    return () => {
      mount.current = false;
    };
  }, [propsChildren]);

  return useMemo(
    () => (
      <Animate
        {...otherProps}
        onExited={handleExited}
        onEntered={handleEntered}
      >
        {children}
      </Animate>
    ),
    [children]
  );
};

Change.defaultProps = {
  unmountOnExit: false,
  keyEqualer: (item1, item2) => item1?.key === item2?.key,
};

export default Change;

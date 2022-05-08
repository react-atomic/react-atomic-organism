import { useRef, useState, useEffect, useMemo } from "react";
import callfunc from "call-func";
import { useMounted } from "reshow-hooks";
import Animate from "../organisms/Animate";

const Change = (props) => {
  const {
    keyEqualer = (item1, item2) => item1?.key === item2?.key,
    children: propsChildren,
    onExited,
    onEntered,
    ...otherProps
  } = props;
  const [children, setChildren] = useState(propsChildren);
  const _mount = useMounted();
  const nextChildren = useRef(propsChildren);
  const isRunning = useRef(false);
  const nextCall = useRef(false);

  const handleExited = (node, isAppear) => {
    if (_mount() && nextChildren.current) {
      setChildren(nextChildren.current);
      callfunc(onExited, [node, isAppear]);
    }
  };

  const handleEntered = (node, isAppear) => {
    isRunning.current = false;
    if (_mount()) {
      if (nextCall.current) {
        callfunc(nextCall.current);
      }
      callfunc(onEntered, [node, isAppear]);
    }
  };

  useEffect(() => {
    const setNext = (willChild) => {
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
          children ? setChildren(null) : setChildren(willChild);
          isRunning.current = true;
        } else {
          reset();
        }
      } else {
        reset();
      }
    };
    setNext(propsChildren);

    return () => {};
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

export default Change;

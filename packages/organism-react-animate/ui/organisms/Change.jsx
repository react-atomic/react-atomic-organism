import { useRef, useState, useMemo } from "react";
import callfunc from "call-func";
import { useMounted, usePrevious } from "reshow-hooks";
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
  const scheduleChildren = useRef();
  const isRunning = useRef(false);
  const nextCall = useRef(false);
  const prevPropsChildren = usePrevious(propsChildren);

  const handleExited = (node, isAppear) => {
    if (_mount() && scheduleChildren.current) {
      setChildren(scheduleChildren.current);
      callfunc(onExited, [node, isAppear]);
    }
  };

  const handleEntered = (node, isAppear) => {
    isRunning.current = false;
    if (_mount()) {
      callfunc(nextCall.current);
      callfunc(onEntered, [node, isAppear]);
    }
  };

  const setNext = (nextChild) => {
    const reset = () => {
      nextCall.current = () => setNext(nextChild);
    };
    if (
      scheduleChildren.current !== nextChild &&
      !keyEqualer(children, nextChild)
    ) {
      if (nextChild && !isRunning.current) {
        scheduleChildren.current = nextChild;
        nextCall.current = false;
        children ? setChildren(null) : setChildren(nextChild);
        isRunning.current = true;
      } else {
        reset();
      }
    } else {
      reset();
    }
  };

  if (prevPropsChildren !== propsChildren) {
    setNext(propsChildren);
  }

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

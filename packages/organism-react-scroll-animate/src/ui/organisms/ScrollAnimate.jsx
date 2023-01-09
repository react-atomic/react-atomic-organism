import React, { useRef, useCallback, useEffect } from "react";
import { build } from "react-atomic-molecule";
import Animate from "organism-react-animate";
import { ScrollInfo, scrollStore } from "organism-react-scroll-nav";
import callfunc from "call-func";

const useScrollContent = (props) => {
  const {
    once = true, //will not update monitorScroll
    isKeep = false, // will keep update monitorScroll if monitorScroll set to true
    minHeight = 155, //need great than browser minHeigh 150px
    children,
    targetInfo,
    style,
    onEntered,
    ...otherProps
  } = props;
  const { isShown, isOnScreen, targetId } = targetInfo;
  const lastShown = useRef();

  useEffect(() => {
    if (once && isShown) {
      const node = scrollStore.scroller.getNode(targetId);
      if (node && !callfunc(node.getMonitorScroll)) {
        node.detach();
      }
    }
  }, [once, isShown, targetId]);

  const handler = {
    entered: useCallback(
      (node, isAppear) => {
        setTimeout(() => {
          callfunc(onEntered, [node, isAppear]);
          if (once && !lastShown.current) {
            lastShown.current = true;
          }
        });
      },
      [once, onEntered]
    ),
  };

  /*handle el*/
  let el;
  const thisStyle = { ...style };
  if (isOnScreen || ((once || isKeep) && isShown)) {
    el = build(children, { doCallFunction: true })();
  } else {
    thisStyle.minHeight = minHeight;
  }

  return {
    otherProps,
    handler,
    el,
    style: thisStyle,
  };
};

const ScrollContent = (props) => {
  const { otherProps, handler, el, style } = useScrollContent(props);

  return (
    <Animate {...otherProps} style={style} onEntered={handler.entered}>
      {el}
    </Animate>
  );
};

const ScrollAnimate = ({
  monitorScroll = false,
  container = ScrollContent,
  ...others
}) => (
  <ScrollInfo {...others} monitorScroll={monitorScroll} container={container} />
);

export default ScrollAnimate;

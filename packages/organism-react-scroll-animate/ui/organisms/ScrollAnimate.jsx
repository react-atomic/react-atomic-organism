import React, { useReducer, useCallback } from "react";
import { build } from "react-atomic-molecule";
import Animate from "organism-react-animate";
import {
  ScrollSpy,
  ScrollReceiver,
  scrollStore,
} from "organism-react-scroll-nav";
import callfunc from "call-func";

const initialState = { isShown: false };

const reducer = (state, action) => {
  state.isShown = action;
  return state;
};

const Content = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    children,
    appear,
    enter,
    leave,
    once,
    isKeep,
    minHeight,
    targetInfo,
    style,
    monitorScroll,
    onEntered,
    ...others
  } = props;
  const { isShown, isOnScreen, targetId } = targetInfo;
  if (once && state.isShown) {
    const node = scrollStore.scroller.getNode(targetId);
    if (node && !node.props.monitorScroll) {
      node.detach();
    }
  }
  let el = null;
  const thisStyle = {};
  if (isOnScreen || (once && isShown) || isKeep) {
    el = build(children, { doCallFunction: true })();
  }
  if (!el) {
    thisStyle.minHeight = minHeight;
  }
  const isIn = (el && !isShown) || (!once && !isOnScreen) ? false : true;
  const thisOnEntered = useCallback(
    (node, isAppear) => {
      setTimeout(() => {
        callfunc(onEntered, [node, isAppear]);
        if (once) {
          dispatch(true);
        }
      });
    },
    [once]
  );
  return (
    <Animate
      {...others}
      style={{ ...thisStyle, ...style }}
      appear={appear}
      enter={enter}
      leave={leave}
      onEntered={thisOnEntered}
      in={isIn}
    >
      {el}
    </Animate>
  );
};

const ScrollAnimate = ({
  appear,
  enter,
  leave,
  once,
  minHeight,
  children,
  ...others
}) => (
  <ScrollSpy {...others}>
    <ScrollReceiver
      appear={appear}
      enter={enter}
      leave={leave}
      once={once}
      minHeight={minHeight}
    >
      {children}
    </ScrollReceiver>
  </ScrollSpy>
);

ScrollAnimate.defaultProps = {
  container: <Content />,
  isKeep: false,
  once: true,
  monitorScroll: false,
  minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;

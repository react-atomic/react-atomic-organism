// @ts-check
import React, { useRef, useCallback, useEffect, useState } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import Animate from "organism-react-animate";
import { ScrollInfo, scrollStore } from "organism-react-scroll-nav";
import callfunc from "call-func";

const useScrollContent = (/**@type any*/ props) => {
  const {
    once = true, //will not update monitorScroll
    isKeep = false, // will keep update monitorScroll if monitorScroll set to true
    minHeight = 155, //need great than browser minHeigh 150px
    children,
    targetInfo,
    style: propsStyle = {},
    onEntered,
    ...restProps
  } = props;
  const { isShown, isOnScreen, targetId } = targetInfo;
  const [state, setState] = useState(() => {
    return {
      el: /**@type any*/ (null),
      style: propsStyle,
    };
  });

  useEffect(() => {
    if (isOnScreen || ((once || isKeep) && isShown)) {
      setState({
        el: build(children, { doCallFunction: true })(),
        style: propsStyle,
      });
    } else {
      setState({
        el: null,
        style: { ...propsStyle, minHeight },
      });
    }
  }, [minHeight, isOnScreen, once, isKeep, isShown, children]);

  useEffect(() => {
    if (once && isShown) {
      const node = scrollStore.scroller.getNode(targetId);
      if (node && !callfunc(node.getMonitorScroll)) {
        node.detach();
      }
    }
  }, [once, isShown, targetId]);

  /*handle el*/

  return {
    once,
    restProps,
    ...state,
  };
};

const ScrollAnimatedContent = (/**@type any*/ { onEntered, ...props }) => {
  const { restProps, el, style, once } = useScrollContent(props);
  const lastShown = useRef(false);
  const handler = {
    entered: useCallback(
      /**
       * @param {HTMLElement} node
       * @param {boolean} isAppear
       */
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
  return (
    <Animate {...restProps} style={style} onEntered={handler.entered}>
      {el}
    </Animate>
  );
};

const ScrollContent = (/**@type any*/ props) => {
  const { el, style, restProps } = useScrollContent(props);
  return (
    <SemanticUI {...restProps} style={style}>
      {el}
    </SemanticUI>
  );
};

/**
 * @typedef {object} ScrollAnimateProps
 * @property {boolean} [monitorScroll=false]
 * @property {import("reshow-build").Component} [container=null] use your own container
 * @property {any=} appear
 * @property {any=} enter
 * @property {any=} leave
 */

/**
 * @param {ScrollAnimateProps & Record<any,any>} inputProps
 */
const ScrollAnimate = ({
  monitorScroll = false,
  container = null,
  ...props
}) => {
  let el = container;

  const animated = props.appear || props.enter || props.leave;

  if (null == el) {
    el = animated ? ScrollAnimatedContent : ScrollContent;
  }

  return <ScrollInfo {...props} monitorScroll={monitorScroll} container={el} />;
};
export default ScrollAnimate;

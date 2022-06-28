import { useState, useEffect, useMemo, useRef } from "react";
import {
  build,
  mixClass,
  useLazyInject,
  getChildMapping,
  SemanticUI,
} from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";
import { useMounted } from "reshow-hooks";
import { KEYS } from "reshow-constant";

import CSSTransition from "../organisms/CSSTransition";
import {
  dataStatusKey,
  aniTransitioning,
  UNMOUNTED,
  ENTERSTART,
  ENTERING,
  EXITED,
} from "../../src/const";

const getAniProps = (props, enterToAppear) => {
  const {
    statusKey,
    timeout,
    delay,
    classNames,
    enter,
    exit,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
  } = props;
  let appear = props.appear;
  if (enterToAppear && classNames && classNames.enter) {
    classNames.appear = classNames.enter;
    delay.appear = delay.enter;
    timeout.appear = timeout.enter;
    appear = true;
  }
  /* not assign onExited, because call at handleExited */
  const aniProps = {
    statusKey,
    timeout,
    delay,
    classNames,
    appear,
    enter,
    exit,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    in: null != props.in ? props.in : true,
  };
  return aniProps;
};

const buildCSSTransition = build(CSSTransition);

const AnimateGroup = (props) => {
  const {
    statusKey = dataStatusKey,
    component = SemanticUI,
    lazy = 150,
    className,
    onExited,
    ...otherProps
  } = props;
  const [children, setChildren] = useState();
  const _mount = useMounted();
  const aniProps = getAniProps(otherProps, true);
  KEYS(aniProps).forEach((key) => delete otherProps[key]);
  injects[statusKey] = useLazyInject(
    InjectStyles({ statusKey }),
    injects[statusKey]
  );
  useEffect(() => {
    let _exitTimeout;
    let _enterTimeout;
    const handleExited = (child) => (node) => {
      callfunc(onExited, [node]);
      _exitTimeout = setTimeout(() => {
        if (false !== _mount()) {
          setChildren((children) => {
            delete children[child.key];
            return { ...children };
          });
        }
      });
    };
    const prevChildMapping = children || {};
    const nextChildMapping = getChildMapping(
      otherProps.children,
      (child, key) =>
        buildCSSTransition(
          {
            ...aniProps,
            key: get(child, ["props", "name"], key),
            onExited: handleExited(child),
          },
          child
        )
    );
    const allChildMapping = { ...prevChildMapping, ...nextChildMapping };
    KEYS(allChildMapping).forEach((key) => {
      const child = allChildMapping[key];
      const hasPrev = key in prevChildMapping;
      const hasNext = key in nextChildMapping;
      const prevChild = prevChildMapping[key];
      const isLeaving = !get(prevChild, ["props", "in"]);
      if (!hasNext && hasPrev) {
        // Will Exit
        if (!isLeaving) {
          allChildMapping[key] = build(child)({ in: false });
        }
      }
    });
    if (!children) {
      _enterTimeout = setTimeout(() => setChildren(allChildMapping), lazy);
    } else {
      setChildren(allChildMapping);
    }
    return () => {
      clearTimeout(_exitTimeout);
      clearTimeout(_enterTimeout);
    };
  }, [props.children]);
  return useMemo(() => {
    /**
     * Should not setup style={overflow:hidden} here,
     * 
     * for reduce animation effect.
     * you could assign it by yourself.
     */
    otherProps.className = mixClass(className, "animate-group-container");
    return build(component)(
      otherProps,
      KEYS(children || {}).map((key) => children[key])
    );
  }, [children]);
};

export default AnimateGroup;

const injects = {};
const InjectStyles = ({ statusKey }) => ({
  hide: [
    {
      visibility: "hidden",
    },
    [
      `[${statusKey}="${ENTERSTART}"]`,
      `[${statusKey}="${ENTERING}"]:not(.${aniTransitioning})`,
    ].join(","),
  ],
  exit: [
    {
      display: "none",
    },
    [`[${statusKey}="${EXITED}"]`, `[${statusKey}="${UNMOUNTED}"]`].join(","),
  ],
});

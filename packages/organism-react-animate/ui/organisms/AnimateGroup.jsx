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

import CSSTransition from "../organisms/CSSTransition";
import { UNMOUNTED, ENTERSTART, EXITED } from "../organisms/Transition";
import { dataStatusKey } from "../../src/const";

const keys = Object.keys;

const getAniProps = (props, enterToAppear) => {
  const {
    unmountOnExit = true,
    statusKey,
    timeout,
    delay,
    classNames,
    mountOnEnter,
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
    mountOnEnter,
    unmountOnExit,
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
    style,
    ...otherProps
  } = props;
  const [children, setChildren] = useState();
  const _mount = useMounted();
  const aniProps = getAniProps(otherProps, true);
  keys(aniProps).forEach((key) => delete otherProps[key]);
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
    keys(allChildMapping).forEach((key) => {
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
    otherProps.style = { overflow: "hidden", ...style };
    otherProps.className = mixClass(className, "animate-group-container");
    return build(component)(
      otherProps,
      keys(children || {}).map((key) => children[key])
    );
  }, [children]);
};

export default AnimateGroup;

const injects = {};
const InjectStyles = ({ statusKey }) => ({
  init: [
    {
      visibility: "hidden",
    },
    [`[${statusKey}="${UNMOUNTED}"]`, `[${statusKey}="${ENTERSTART}"]`].join(
      ","
    ),
  ],
  exit: [
    {
      display: "none",
    },
    `[${statusKey}="${EXITED}"]`,
  ],
});

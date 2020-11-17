import React, { useState, useEffect, useMemo, useRef } from "react";
import { build, mixClass, lazyInject, getChildMapping } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";

import CSSTransition from "../organisms/CSSTransition";
import { UNMOUNTED, ENTERSTART, EXITED } from "../organisms/Transition";
import { dataStatusKey } from "../../src/const";

const keys = Object.keys;

const getAniProps = (props, enterToAppear) => {
  const {
    statusKey,
    timeout,
    delay,
    classNames,
    mountOnEnter,
    unmountOnExit,
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
    in: props.in,
  };
  return aniProps;
};

const buildCSSTransition = build(CSSTransition);

const AnimateGroup = (props) => {
  const {
    className,
    component,
    lazy,
    onExited,
    style,
    statusKey,
    ...otherProps
  } = props;
  const [children, setChildren] = useState();
  const mount = useRef(false);
  const aniProps = getAniProps(otherProps, true);
  keys(aniProps).forEach((key) => delete otherProps[key]);
  useEffect(() => {
    injects = lazyInject(injects, InjectStyles({ statusKey }));
  }, []);
  useEffect(() => {
    let _exitTimeout;
    let _enterTimeout;
    mount.current = true;
    const handleExited = (child) => (node) => {
      callfunc(onExited, [node]);
      _exitTimeout = setTimeout(() => {
        if (mount.current) {
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
            ...child.props,
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
      mount.current = false;
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

AnimateGroup.defaultProps = {
  statusKey: dataStatusKey,
  lazy: 150,
  component: "div",
  unmountOnExit: true,
  in: true,
};

export default AnimateGroup;

let injects;
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

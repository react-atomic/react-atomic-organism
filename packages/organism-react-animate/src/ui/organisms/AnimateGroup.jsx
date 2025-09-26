import { useState, useEffect, useMemo } from "react";
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
import { dataStatusKey, animateGroupClass } from "../../const";
import { InjectStyles } from "../../initAniStyle";

const injects = {};
const getAniProps = (props, copyEnterToAppear) => {
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
  if (copyEnterToAppear && classNames && classNames.enter) {
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
    in: true,
  };
  return aniProps;
};

const buildCSSTransition = build(CSSTransition);

const AnimateGroup = (props) => {
  const {
    copyEnterToAppear = true,
    isLoad = true,
    statusKey = dataStatusKey,
    component = SemanticUI,
    lazy = 150,
    children: propsChildren,
    className,
    onExited,
    ...restProps
  } = props;
  const [children, setChildren] = useState();
  const _mount = useMounted();
  injects[statusKey] = useLazyInject(
    InjectStyles({ statusKey }),
    injects[statusKey]
  );
  const aniProps = getAniProps(restProps, copyEnterToAppear);
  KEYS(aniProps).forEach((key) => delete restProps[key]);
  useEffect(() => {
    let _exitTimeout;
    let _enterTimeout;
    if (isLoad) {
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
      const nextChildMapping = getChildMapping(propsChildren, (child, key) =>
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
    }
    return () => {
      clearTimeout(_exitTimeout);
      clearTimeout(_enterTimeout);
    };
  }, [props.children, isLoad]);
  return useMemo(() => {
    if (!isLoad) {
      return build(component)({...restProps, className});
    }

    /**
     * Should not setup style={overflow:hidden} here,
     *
     * for reduce animation effect.
     * you could assign it by yourself.
     */
    restProps.className = mixClass(className, animateGroupClass);
    return build(component)(
      restProps,
      KEYS(children || {}).map((key) => children[key])
    );
  }, [children, isLoad]);
};

export default AnimateGroup;

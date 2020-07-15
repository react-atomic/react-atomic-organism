import React, { cloneElement } from "react";
import { mixClass, removeClass } from "class-lib";
import get from "get-object-value";
import callfunc from "call-func";

import Transition from "../organisms/Transition";

const getValue = (arr, isAppear, isExit, defaultValue) => {
  const index = isExit ? "exit" : isAppear ? "appear" : "enter";
  return get(arr, [index], defaultValue);
};

const FUNCTION = "function";

const handleStart = (
  classList,
  handler,
  delay,
  isExit,
  ing,
  node,
  isAppear
) => {
  if (!node || !node.style) {
    return;
  }
  if (!isExit && !ing) {
    node.style.visibility = "hidden";
  }
  const thisDelay = getValue(delay, isAppear, isExit, 0);
  setTimeout(() => {
    if (!ing) {
      const thisClass = getValue(classList, isAppear, isExit);
      if (thisClass) {
        node.className = mixClass(node.className, thisClass);
      }
      node.style.visibility = "inherit";
    }
    callfunc(handler, [node, isAppear]);
  }, thisDelay);
};

const handleReset = (classList, handler, isExit, node, isAppear) => {
  if (node) {
    const thisClass = getValue(classList, isAppear, isExit);
    if (thisClass) {
      node.className = removeClass(node.className, thisClass);
    }
  }
  callfunc(handler, [node, isAppear]);
};

const CSSTransition = ({
  classNames,
  delay,
  isCompiled,
  isCSSTransition,
  onEnter,
  onEntering,
  onExit,
  onExiting,
  resetEntered,
  resetExited,
  ...props
}) => (
  <Transition
    {...props}
    onEnter={handleStart.bind(this, classNames, onEnter, delay, false, false)}
    onEntering={handleStart.bind(
      this,
      classNames,
      onEntering,
      delay,
      false,
      true
    )}
    resetEntered={handleReset.bind(this, classNames, resetEntered, false)}
    onExit={handleStart.bind(this, classNames, onExit, delay, true, false)}
    onExiting={handleStart.bind(this, classNames, onExiting, delay, true, true)}
    resetExited={handleReset.bind(this, classNames, resetExited, true)}
  />
);
CSSTransition.defaultProps = {
  isCSSTransition: true,
  isCompiled: false,
  in: true
};
export default CSSTransition;

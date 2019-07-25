import React, {cloneElement} from 'react';
import Transition from '../organisms/Transition';
import {mixClass, removeClass} from 'class-lib';
import get from 'get-object-value';

const getValue = (arr, isAppear, isExit, defaultValue) => {
  const index = isExit ? 'exit' : isAppear ? 'appear' : 'enter';
  return get(arr, [index], defaultValue);
};

const FUNCTION = 'function';

const handleStart = (
  classList,
  handler,
  delay,
  isExit,
  ing,
  node,
  isAppear,
) => {
  if (!node || !node.style) {
    return;
  }
  if (!isExit && !ing) {
    node.style.visibility = 'hidden';
  }
  const thisDelay = getValue(delay, isAppear, isExit, 0);
  setTimeout(() => {
    if (!ing) {
      node.style.visibility = 'inherit';
      const thisClass = getValue(classList, isAppear, isExit);
      if (thisClass && !ing) {
        node.className = mixClass(node.className, thisClass);
      }
    }
    if (FUNCTION === typeof handler) {
      handler(node, isAppear);
    }
  }, thisDelay);
};

const handleFinish = (classList, handler, isExit, node, isAppear) => {
  if (node) {
    if (isExit) {
      node.style.visibility = 'hidden';
    }
    const thisClass = getValue(classList, isAppear, isExit);
    if (thisClass) {
      node.className = removeClass(node.className, thisClass);
    }
  }
  if (FUNCTION === typeof handler) {
    handler(node, isAppear);
  }
};

const CSSTransition = ({
  classNames,
  delay,
  isCompiled,
  isCSSTransition,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
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
      true,
    )}
    onEntered={handleFinish.bind(this, classNames, onEntered, false)}
    onExit={handleStart.bind(this, classNames, onExit, delay, true, false)}
    onExiting={handleStart.bind(this, classNames, onExiting, delay, true, true)}
    onExited={handleFinish.bind(this, classNames, onExited, true)}
  />
);
CSSTransition.defaultProps = {
  isCSSTransition: true,
  isCompiled: false,
  in: true,
};
export default CSSTransition;

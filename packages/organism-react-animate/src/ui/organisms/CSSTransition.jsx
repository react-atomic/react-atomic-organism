import { mixClass, removeClass } from "class-lib";
import get from "get-object-value";
import callfunc from "call-func";
import { KEYS } from "reshow-constant";

import Transition from "../organisms/Transition";
import { aniTransitioning } from "../../const";

const getIndex = (isAppear, isExit, { exit, appear, enter }) => {
  const index = isExit ? exit : isAppear ? appear : enter;
  return index;
};

const getAction = (isDone, ing, { start, active, done }) => {
  if (!ing) {
    return isDone ? done : start;
  } else {
    return active;
  }
};

const getValue = (arr, index, defaultValue) => get(arr, [index], defaultValue);

const getClassName = (arr, index, action) => {
  const classes = getValue(arr, index);
  return get(classes, [action], classes);
};

const handleStart = (
  { classNames, delay, stepKeys, actionKeys },
  handler,
  isExit,
  ing,
  node,
  isAppear
) => {
  const index = getIndex(isAppear, isExit, stepKeys);
  const action = getAction(false, ing, actionKeys);
  const thisDelay = getValue(delay, index, 0);
  setTimeout(() => {
    if (node && ing) {
      const thisClass = getClassName(classNames, index, action);
      if (thisClass) {
        node.className = mixClass(node.className, thisClass, aniTransitioning);
      }
      callfunc(handler, [node, isAppear]);
    }
  }, thisDelay);
};

const handleFinish = (
  { classNames, delay, stepKeys, actionKeys },
  handler,
  isExit,
  node,
  isAppear
) => {
  if (node) {
    const index = getIndex(isAppear, isExit, stepKeys);
    const action = getAction(true, false, actionKeys);
    const thisClass = getClassName(classNames, index, action);
    if (thisClass) {
      node.className = mixClass(node.className, thisClass);
    }
  }
  callfunc(handler, [node, isAppear]);
};

const handleReset = (
  { classNames, delay, stepKeys, actionKeys },
  handler,
  isExit,
  isDone,
  node,
  isAppear
) => {
  if (node) {
    const index = getIndex(isAppear, isExit, stepKeys);
    KEYS(actionKeys).forEach((key) => {
      const action = actionKeys[key];
      const thisClass = getClassName(classNames, index, action);
      if (thisClass) {
        node.className = removeClass(
          node.className,
          thisClass,
          aniTransitioning
        );
      }
    });
  }
  callfunc(handler, [node, isAppear]);
};

const CSSTransition = ({
  stepKeys = {
    appear: "appear",
    enter: "enter",
    exit: "exit",
  },
  actionKeys = {
    start: "",
    active: "active",
    done: "done",
  },
  classNames,
  delay,
  beforeEnter,
  afterEnter,
  onEnter,
  onEntering,
  onEntered,
  beforeExit,
  afterExit,
  onExit,
  onExiting,
  onExited,
  ...props
}) => {
  const options = { classNames, delay, stepKeys, actionKeys };
  return (
    <Transition
      {...props}
      beforeEnter={handleReset.bind(this, options, beforeEnter, false, false)}
      afterEnter={handleReset.bind(this, options, afterEnter, false, true)}
      onEnter={handleStart.bind(this, options, onEnter, false, false)}
      onEntering={handleStart.bind(this, options, onEntering, false, true)}
      onEntered={handleFinish.bind(this, options, onEntered, false)}
      beforeExit={handleReset.bind(this, options, beforeExit, true, false)}
      afterExit={handleReset.bind(this, options, afterExit, true, true)}
      onExit={handleStart.bind(this, options, onExit, true, false)}
      onExiting={handleStart.bind(this, options, onExiting, true, true)}
      onExited={handleFinish.bind(this, options, onExited, true)}
    />
  );
};
export default CSSTransition;

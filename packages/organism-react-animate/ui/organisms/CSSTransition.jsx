import { mixClass, removeClass } from "class-lib";
import get from "get-object-value";
import callfunc from "call-func";

import Transition from "../organisms/Transition";

const keys = Object.keys;

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

const getValue = (arr, index, defaultValue) => {
  return get(arr, [index], defaultValue);
};

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
  if (!node || !node.style) {
    return;
  }
  const index = getIndex(isAppear, isExit, stepKeys);
  const action = getAction(false, ing, actionKeys);
  if (!isExit && !ing) {
    node.style.visibility = "hidden";
  }
  const thisDelay = getValue(delay, index, 0);
  setTimeout(() => {
    const thisClass = getClassName(classNames, index, action);
    if (thisClass) {
      node.className = mixClass(node.className, thisClass);
    }
    node.style.visibility = "inherit";
    callfunc(handler, [node, isAppear]);
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
  node,
  isAppear
) => {
  if (node) {
    const index = getIndex(isAppear, isExit, stepKeys);
    keys(actionKeys).forEach((key) => {
      const action = actionKeys[key];
      const thisClass = getClassName(classNames, index, action);
      if (thisClass) {
        node.className = removeClass(node.className, thisClass);
      }
    });
  }
  callfunc(handler, [node, isAppear]);
};

const CSSTransition = ({
  classNames,
  delay,
  stepKeys,
  actionKeys,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  resetEntered,
  resetExited,
  ...props
}) => {
  const options = { classNames, delay, stepKeys, actionKeys };
  return (
    <Transition
      {...props}
      onEnter={handleStart.bind(this, options, onEnter, false, false)}
      onEntering={handleStart.bind(this, options, onEntering, false, true)}
      onEntered={handleFinish.bind(this, options, onEntered, false)}
      resetEntered={handleReset.bind(this, options, resetEntered, false)}
      onExit={handleStart.bind(this, options, onExit, true, false)}
      onExiting={handleStart.bind(this, options, onExiting, true, true)}
      onExited={handleFinish.bind(this, options, onExited, true)}
      resetExited={handleReset.bind(this, options, resetExited, true)}
    />
  );
};
CSSTransition.defaultProps = {
  stepKeys: {
    appear: "appear",
    enter: "enter",
    exit: "exit",
  },
  actionKeys: {
    start: "",
    active: "active",
    done: "done",
  },
  in: true,
};
export default CSSTransition;

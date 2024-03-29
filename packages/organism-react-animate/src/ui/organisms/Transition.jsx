//@ts-check

import { useState, useEffect, useRef } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";
import { useTimer } from "reshow-hooks";

import {
  dataStatusKey,
  ENTERSTART,
  ENTERING,
  ENTERED,
  UNMOUNTED,
  EXITSTART,
  EXITING,
  EXITED,
} from "../../const";

/**
 * @typedef {object} TimeoutType
 * @property {number} exit
 * @property {number} enter
 * @property {number} appear
 */

/**
 * @param {Object} timeout
 * @returns {TimeoutType}
 */
const getTimeouts = (timeout) => {
  let exit, enter, appear;

  exit = enter = appear = timeout;

  if (timeout != null && typeof timeout !== "number") {
    exit = timeout.exit;
    enter = timeout.enter;
    appear = timeout.appear ?? enter;
  }
  return { exit, enter, appear };
};

/**
 * @param {function} callback
 */
const setNextCallback = (callback) => {
  let active = true;
  /**
   * @param {string} event
   */
  const nextCallback = (event) => {
    if (active) {
      callfunc(callback, [event]);
    }
    nextCallback.reset();
  };
  nextCallback.reset = () => {
    active = false;
  };
  return nextCallback;
};

/**
 * @param {Object} lastData
 */
const cancelNextCallback = (lastData) => {
  if (lastData.current.nextCallback !== null) {
    lastData.current.nextCallback.reset();
    lastData.current.nextCallback = null;
  }
};

const perform = ({
  isAppear,
  step1,
  step1Cb,
  step2,
  step2Cb,
  step3,
  step3Cb,
  setUp,
  safeSetState,
  onTransitionEnd,
  tearDown,
  goToLast,
  node,
  timeout,
}) => {
  const last = () => {
    onTransitionEnd(
      () => {
        safeSetState(step3, () => {
          callfunc(step3Cb, [node, isAppear]);
          setTimeout(() => callfunc(tearDown, [node, isAppear]));
        });
      },
      timeout,
      node
    );
  };
  callfunc(setUp, [node, isAppear]);
  if (goToLast) {
    last();
  } else {
    safeSetState(step1, () => {
      callfunc(step1Cb, [node, isAppear]);
      safeSetState(step2, () => {
        callfunc(step2Cb, [node, isAppear]);
        last();
      });
    });
  }
};

const useTransition = ({
  component = SemanticUI,
  statusKey = dataStatusKey,
  mountOnEnter = false,
  unmountOnExit = false,

  appear = false,
  enter = true,
  exit = true,
  in: propsIn = false,

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

  children,
  timeout,
  addEndListener,
  ...otherProps
}) => {
  const [status, setStatus] = useState(() => {
    let initialStatus;
    if (propsIn) {
      if (appear) {
        initialStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (unmountOnExit || mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    return initialStatus;
  });

  const lastNode = useRef();
  const lastData = useRef({
    in: null,
    callbackWith: null,
    nextCallback: null,
    init: false,
  });
  const [TransitionEndTimer, StopTransitionEndTimer] = useTimer();

  useEffect(() => {
    /**
     * @param {string} nextStatus
     * @param {function} callback
     */
    const safeSetState = (nextStatus, callback) => {
      // This shouldn't be necessary, but there are weird race conditions with
      // setState callbacks and unmounting in testing, so always make sure that
      // we can cancel any pending setState callbacks after we unmount.
      lastData.current.callbackWith = nextStatus;
      lastData.current.nextCallback = callback
        ? setNextCallback(callback)
        : null;
      setStatus(nextStatus);
    };

    /**
     * @param {function} handler
     * @param {number} timeout
     * @param {HTMLElement} node
     */
    const onTransitionEnd = (handler, timeout, node) => {
      const callback = setNextCallback(() => {
        callfunc(handler);
        callfunc(addEndListener, [{ node, state: lastData.current, status }]);
      });
      lastData.current.nextCallback = callback;
      TransitionEndTimer(
        () => callfunc(lastData.current.nextCallback, ["onTransitionEnd"]),
        timeout || 0
      );
    };

    /**
     * @param {boolean} mounting
     * @param {string} nextStatus
     */
    const updateStatus = (mounting, nextStatus) => {
      if (nextStatus !== null) {
        // nextStatus will always be ENTERING or EXITING.
        cancelNextCallback(lastData);
        const timeouts = getTimeouts(timeout);
        if (nextStatus === ENTERING) {
          perform({
            setUp: beforeEnter,
            tearDown: afterEnter,
            step1: ENTERSTART,
            step1Cb: onEnter,
            step2: ENTERING,
            step2Cb: onEntering,
            step3: ENTERED,
            step3Cb: onEntered,
            goToLast: (mounting && !appear) || (!mounting && !enter),
            node: lastNode.current,
            safeSetState,
            onTransitionEnd,
            isAppear: mounting,
            timeout: mounting ? timeouts.appear : timeouts.enter,
          });
        } else {
          perform({
            setUp: beforeExit,
            tearDown: afterExit,
            step1: EXITSTART,
            step1Cb: onExit,
            step2: EXITING,
            step2Cb: onExiting,
            step3: EXITED,
            step3Cb: onExited,
            goToLast: !exit,
            node: lastNode.current,
            safeSetState,
            onTransitionEnd,
            isAppear: mounting,
            timeout: timeouts.exit,
          });
        }
      } else if (unmountOnExit && status === EXITED) {
        setStatus(UNMOUNTED);
      }
    };

    if (lastData.current.callbackWith === status) {
      callfunc(lastData.current.nextCallback, [status]);
    }

    if (lastData.current.in !== propsIn) {
      let nextStatus = null;
      let mounting = false;
      lastData.current.in = propsIn;
      if (propsIn) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        } else if (!lastData.current.init) {
          lastData.current.init = true;
          if (appear) {
            nextStatus = ENTERING;
            mounting = true;
          }
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
      updateStatus(mounting, nextStatus);
    }

    return () => {
      // useEffect clean
      StopTransitionEndTimer();
    };
  }, [propsIn, status]); //end useEffect

  return {
    status,
    otherProps,
    component,
    children,
    statusKey,
    lastNode,
  };
};

/**
 * @typedef {Object} TransitionProps
 */

/**
 * @type React.FC<TransitionProps>
 */
const Transition = (props) => {
  const { status, otherProps, component, children, statusKey, lastNode } =
    useTransition(props);
  if (status !== UNMOUNTED) {
    otherProps.children = children;
  }
  otherProps[statusKey] = status;
  otherProps.refCb = lastNode;
  return build(component)(otherProps);
};

export default Transition;

import { useState, useEffect, useMemo, useRef } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";
import { useTimer } from "reshow-hooks";
import { dataStatusKey } from "../../src/const";
import { T_UNDEFINED } from "reshow-constant";

export const UNMOUNTED = "unmounted";
export const EXITSTART = "exit-start";
export const EXITING = "exiting";
export const EXITED = "exited";
export const ENTERSTART = "enter-start";
export const ENTERING = "entering";
export const ENTERED = "entered";

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

const setNextCallback = (callback) => {
  let active = true;
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

const cancelNextCallback = (lastData) => {
  if (lastData.current.nextCallback !== null) {
    lastData.current.nextCallback.reset();
    lastData.current.nextCallback = null;
  }
};

const perform = ({
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
  isAppear,
  node,
  timeout,
}) => {
  const last = () => {
    onTransitionEnd(node, timeout, () => {
      safeSetState(step3, () => {
        callfunc(step3Cb, [node, isAppear]);
        setTimeout(() => callfunc(tearDown, [node, isAppear]));
      });
    });
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

const Transition = ({
  statusKey = dataStatusKey,
  component = SemanticUI,
  mountOnEnter = false,
  unmountOnExit = false,

  appear = false,
  enter = true,
  exit = true,

  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,

  children,
  timeout,
  addEndListener,
  getProps,
  resetEntered,
  resetExited,
  ...props
}) => {
  const propsIn = null != props.in ? props.in : false;
  const [status, setStatus] = useState(() => {
    const thisAppear = appear;
    let initialStatus;
    if (propsIn) {
      if (thisAppear) {
        initialStatus = EXITED;
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
    if (lastData.current.callbackWith === status) {
      callfunc(lastData.current.nextCallback, [status]);
    }

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

    const onTransitionEnd = (node, timeout, handler) => {
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

    const updateStatus = (mounting, nextStatus) => {
      if (nextStatus !== null) {
        // nextStatus will always be ENTERING or EXITING.
        cancelNextCallback(lastData);
        const timeouts = getTimeouts(timeout);
        if (nextStatus === ENTERING) {
          perform({
            step1: ENTERSTART,
            step1Cb: onEnter,
            step2: ENTERING,
            step2Cb: onEntering,
            step3: ENTERED,
            step3Cb: onEntered,
            setUp: resetExited,
            tearDown: resetEntered,
            goToLast: (mounting && !appear) || (!mounting && !enter),
            node: lastNode.current,
            safeSetState,
            onTransitionEnd,
            isAppear: mounting,
            timeout: mounting ? timeouts.appear : timeouts.enter,
          });
        } else {
          perform({
            step1: EXITSTART,
            step1Cb: onExit,
            step2: EXITING,
            step2Cb: onExiting,
            step3: EXITED,
            step3Cb: onExited,
            setUp: resetEntered,
            tearDown: resetExited,
            goToLast: !exit,
            node: lastNode.current,
            safeSetState,
            onTransitionEnd,
            timeout: timeouts.exit,
          });
        }
      } else if (unmountOnExit && status === EXITED) {
        safeSetState(UNMOUNTED);
      }
    };

    let nextStatus = null;
    let mounting = null;
    if (lastData.current.in !== propsIn) {
      mounting = false;
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
    }
    updateStatus(mounting, nextStatus);

    return () => {
      // useEffect clean
      StopTransitionEndTimer();
    };
  }, [propsIn, status]);

  return useMemo(() => {
    let nextProps;
    if (status !== UNMOUNTED) {
      nextProps = { ...props, in: T_UNDEFINED };
      nextProps.children = build(children)(nextProps);
    }
    return build(component)({
      [statusKey]: status,
      refCb: lastNode,
      ...(callfunc(getProps, [status, nextProps]) || nextProps),
    });
  }, [props]);
};

export default Transition;

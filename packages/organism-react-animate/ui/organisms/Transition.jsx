import React, {useState, useEffect, useReducer, useMemo} from 'react';
import {build, SemanticUI} from 'react-atomic-molecule';
import callfunc from 'call-func';

const keys = Object.keys;

export const UNMOUNTED = 'unmounted';
export const EXITSTART = 'exit-start';
export const EXITING = 'exiting';
export const EXITED = 'exited';
export const ENTERSTART = 'enter-start';
export const ENTERING = 'entering';
export const ENTERED = 'entered';

const reducer = (state, action) => {
  keys(action).forEach(key => (state[key] = action[key]));
  return state;
};

const getTimeouts = timeout => {
  let exit, enter, appear;

  exit = enter = appear = timeout;

  if (timeout != null && typeof timeout !== 'number') {
    exit = timeout.exit;
    enter = timeout.enter;
    // TODO: remove fallback for next major
    appear = timeout.appear !== undefined ? timeout.appear : enter;
  }
  return {exit, enter, appear};
};

const setNextCallback = callback => {
  let active = true;
  const nextCallback = event => {
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

const Transition = ({
  component,
  children,
  mountOnEnter,
  unmountOnExit,
  appear,
  enter,
  exit,
  timeout,
  addEndListener,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {
    in: props.in,
    callbackWith: null,
    nextCallback: null,
    appearStatus: null,
    init: false,
    node: false,
  });

  const [status, setStatus] = useState(() => {
    const thisAppear = appear;
    let initialStatus;
    if (props.in) {
      if (thisAppear) {
        initialStatus = EXITED;
        dispatch({appearStatus: ENTERING});
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

  const cancelNextCallback = () => {
    if (state.nextCallback !== null) {
      state.nextCallback.reset();
      dispatch({nextCallback: null});
    }
  };

  useEffect(() => {
    if (state.callbackWith === status) {
      callfunc(state.nextCallback, [status]);
    }
    const safeSetState = (nextStatus, callback) => {
      // This shouldn't be necessary, but there are weird race conditions with
      // setState callbacks and unmounting in testing, so always make sure that
      // we can cancel any pending setState callbacks after we unmount.

      dispatch({
        callbackWith: nextStatus,
        nextCallback: callback ? setNextCallback(callback) : null,
      });
      setStatus(nextStatus);
    };
    const onTransitionEnd = (node, timeout, handler) => {
      if (state.timer) {
        clearTimeout(state.timer);
      }
      const callback = setNextCallback(() => {
        callfunc(handler);
        if (addEndListener) {
          callfunc(addEndListener, [{node, state, status}]);
        }
      });
      const myCb = () => {
        callfunc(state.nextCallback, ['onTransitionEnd']);
      };
      dispatch({
        nextCallback: callback,
        timer: setTimeout(myCb, timeout || 0)
      });
    };
    const performEnter = mounting => {
      const timeouts = getTimeouts(timeout);
      const enterTimeout = mounting ? timeouts.appear : timeouts.enter;
      const last = () => {
        onTransitionEnd(state.node, enterTimeout, () => {
          safeSetState(ENTERED, () =>
            callfunc(onEntered, [state.node, mounting]),
          );
        });
      };

      // no enter animation skip right to ENTERED
      // if we are mounting and running this it means appear _must_ be set
      if (mounting && (!appear && !enter)) {
        safeSetState(ENTERED, () => last());
        return;
      }
      safeSetState(ENTERSTART, () => {
        callfunc(onEnter, [state.node, mounting]);
        safeSetState(ENTERING, () => {
          callfunc(onEntering, [state.node, mounting]);
          last();
        });
      });
    };
    const performExit = () => {
      const timeouts = getTimeouts(timeout);

      const last = () => {
        onTransitionEnd(state.node, timeouts.exit, () => {
          safeSetState(EXITED, () => {
            callfunc(onExited, [state.node]);
          });
        });
      };

      // no exit animation skip right to EXITED
      if (!exit) {
        safeSetState(EXITED, () => last());
        return;
      }
      safeSetState(EXITSTART, () => {
        callfunc(onExit, [state.node]);
        safeSetState(EXITING, () => {
          callfunc(onExiting, [state.node]);
          last();
        });
      });
    };
    const updateStatus = (mounting, nextStatus) => {
      if (nextStatus !== null) {
        // nextStatus will always be ENTERING or EXITING.
        cancelNextCallback();
        if (nextStatus === ENTERING) {
          performEnter(mounting);
        } else {
          performExit();
        }
      } else if (unmountOnExit && status === EXITED) {
        safeSetState(UNMOUNTED);
      }
    };

    let nextStatus = null;
    let mounting = null;
    if (state.in !== props.in) {
      mounting = false;
      dispatch({in: props.in});
      if (props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    if (!state.init) {
      dispatch({init: true});
      nextStatus = state.appearStatus;
      mounting = true;
    }
    updateStatus(mounting, nextStatus);

    return () => {
      // useEffect clean
      if (state.timer) {
        clearTimeout(state.timer);
      }
    };
  }, [props.in, status]);
  return useMemo(() => {
    let myChild = undefined;
    if (status !== UNMOUNTED) {
      const nextProps = {...props};
      delete nextProps.in;
      myChild = build(children)(nextProps);
    }
    return build(component)(
      {
        'data-status': status,
        refCb: el => dispatch({node: el}),
      },
      myChild,
    );
  }, [props]);
};

Transition.defaultProps = {
  component: SemanticUI,
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: false,
  onEntering: false,
  onEntered: false,

  onExit: false,
  onExiting: false,
  onExited: false,
};

export default Transition;

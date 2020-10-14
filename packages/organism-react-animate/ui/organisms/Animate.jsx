import React, { useState, useRef, useEffect } from "react";
import { reactStyle, SemanticUI } from "react-atomic-molecule";
import getKeyframe from "keyframe-css";
import { doc } from "win-doc";

import AnimateGroup from "../organisms/AnimateGroup";

const inject = {};
const injectDone = {};
const injectCb = {};
const init = (key, ani, timeout, callback) => {
  if (!injectCb[ani]) {
    injectCb[ani] = [];
  }
  if (!injectDone[ani]) {
    injectCb[ani].push(callback);
  } else {
    callback();
  }
  if (inject[key] || doc().__null) {
    return;
  }
  reactStyle(
    {
      animationName: [ani],
      animationDuration: [timeout * 1 + 30 + "ms"],
      ...Styles.linear,
    },
    "." + key,
    key
  );

  // Need locate after reactStyle, for inject latest style in getKeyframe function
  getKeyframe(ani, () => {
    injectDone[ani] = true;
    injectCb[ani].forEach((cb) => cb());
  });
  inject[key] = true;
};

const parseAniValue = (s) => {
  const data = s.split("-");
  const name = data[0];
  let timeout = 500;
  let delay = 0;
  if (!isNaN(data[1])) {
    timeout = parseInt(data[1], 10);
  }
  if (!isNaN(data[2])) {
    delay = parseInt(data[2], 10);
    timeout += delay;
  }
  const key = [name, timeout, delay].join("-");
  return {
    className: key + " " + name,
    key,
    name,
    timeout,
    delay,
  };
};

const Animate = (props) => {
  const { appear, enter, leave, ...others } = props;
  const [isLoad, setIsLoad] = useState(false);
  const [aniConf, setAniConf] = useState({});
  const done = useRef([]);

  useEffect(() => {
    const that = {};
    let data;
    const isDone = (key) => () => {
      done.current = done.current.filter((val) => val !== key);
      if (done.current.length) {
        return;
      } else {
        setTimeout(() => setIsLoad(true));
      }
    };
    if (appear) {
      data = parseAniValue(appear);
      that.appear = data.name;
      that.appearKey = data.key;
      that.appearTimeout = data.timeout;
      that.appearDelay = data.delay;
      that.appearClass = data.className;
      done.current.push(appear);
      init(that.appearKey, that.appear, that.appearTimeout, isDone(appear));
    }
    if (enter) {
      data = parseAniValue(enter);
      that.enter = data.name;
      that.enterKey = data.key;
      that.enterTimeout = data.timeout;
      that.enterDelay = data.delay;
      that.enterClass = data.className;
      done.current.push(enter);
      init(that.enterKey, that.enter, that.enterTimeout, isDone(enter));
    }
    if (leave) {
      data = parseAniValue(leave);
      that.leave = data.name;
      that.leaveKey = data.key;
      that.leaveTimeout = data.timeout;
      that.leaveDelay = data.delay;
      that.leaveClass = data.className;
      done.current.push(leave);
      init(that.leaveKey, that.leave, that.leaveTimeout, isDone(leave));
    }
    if (!appear && !enter && !leave) {
      setIsLoad(true);
    }
    setAniConf(that);
  }, [appear, enter, leave]);

  return isLoad ? (
    <AnimateGroup
      timeout={{
        appear: aniConf.appearTimeout,
        enter: aniConf.enterTimeout,
        exit: aniConf.leaveTimeout,
      }}
      delay={{
        appear: aniConf.appearDelay,
        enter: aniConf.enterDelay,
        exit: aniConf.leaveDelay,
      }}
      classNames={{
        appear: aniConf.appearClass,
        enter: aniConf.enterClass,
        exit: aniConf.leaveClass,
      }}
      appear={!!appear}
      enter={!!enter}
      exit={!!leave}
      {...others}
    />
  ) : null;
};

Animate.defaultProps = {
  component: SemanticUI,
  appear: null,
  enter: null,
  leave: null,
};

export default Animate;

const Styles = {
  linear: {
    animationIterationCount: [1],
    animationTimingFunction: ["linear"],
  },
};

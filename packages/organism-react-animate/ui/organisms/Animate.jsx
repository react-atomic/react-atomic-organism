import { useState, useRef, useEffect } from "react";
import { reactStyle } from "react-atomic-molecule";
import { useMounted } from "reshow-hooks";
import { NEW_OBJ } from "reshow-constant";
import getKeyframe from "keyframe-css";
import { initMap } from "get-object-value";

import AnimateGroup from "../organisms/AnimateGroup";

const inject = NEW_OBJ();
const injectDone = NEW_OBJ();
const injectCb = NEW_OBJ();
const init = (key, ani, timeout, callback) => {
  injectDone[ani] ? callback() : initMap(injectCb)(ani, []).push(callback);
  if (inject[key]) {
    return;
  }
  const buildAniStyle = () => {
    reactStyle(
      {
        animationName: [ani],
        animationDuration: [timeout + 1 + "ms"],
        animationIterationCount: [1],
        animationTimingFunction: [`steps(${Math.floor(timeout / 30)}, end)`],
      },
      "." + key,
      key
    );
  };
  injectDone[ani]
    ? buildAniStyle(injectDone[ani])
    : injectCb[ani].push(buildAniStyle);

  // Need locate after reactStyle, for inject latest style in getKeyframe function
  getKeyframe(ani, () => {
    injectDone[ani] = true;
    injectCb[ani].forEach((cb) => cb(injectDone[ani]));
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
  const lastRun = useRef([]);
  const _mount = useMounted();

  useEffect(() => {
    const that = {};
    let data;
    const isDone = (key) => () => {
      lastRun.current = lastRun.current.filter((val) => val !== key);
      if (lastRun.current.length) {
        return;
      } else {
        setTimeout(() => _mount() && setIsLoad(true));
      }
    };
    if (appear) {
      data = parseAniValue(appear);
      that.appear = data.name;
      that.appearKey = data.key;
      that.appearTimeout = data.timeout;
      that.appearDelay = data.delay;
      that.appearClass = data.className;
      lastRun.current.push(appear);
      init(that.appearKey, that.appear, that.appearTimeout, isDone(appear));
    }
    if (enter) {
      data = parseAniValue(enter);
      that.enter = data.name;
      that.enterKey = data.key;
      that.enterTimeout = data.timeout;
      that.enterDelay = data.delay;
      that.enterClass = data.className;
      lastRun.current.push(enter);
      init(that.enterKey, that.enter, that.enterTimeout, isDone(enter));
    }
    if (leave) {
      data = parseAniValue(leave);
      that.leave = data.name;
      that.leaveKey = data.key;
      that.leaveTimeout = data.timeout;
      that.leaveDelay = data.delay;
      that.leaveClass = data.className;
      lastRun.current.push(leave);
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

export default Animate;

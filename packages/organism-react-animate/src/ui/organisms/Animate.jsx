import { useState, useRef, useEffect } from "react";
import { build } from "react-atomic-molecule";
import { useMounted } from "reshow-hooks";

import AnimateGroup from "../organisms/AnimateGroup";
import { initAni, parseAniValue } from "../../aniUtil";

const Animate = (props) => {
  const { appear, enter, leave, ...restProps } = props;
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
      initAni(that.appearKey, that.appear, that.appearTimeout, isDone(appear));
    }
    if (enter) {
      data = parseAniValue(enter);
      that.enter = data.name;
      that.enterKey = data.key;
      that.enterTimeout = data.timeout;
      that.enterDelay = data.delay;
      that.enterClass = data.className;
      lastRun.current.push(enter);
      initAni(that.enterKey, that.enter, that.enterTimeout, isDone(enter));
    }
    if (leave) {
      data = parseAniValue(leave);
      that.leave = data.name;
      that.leaveKey = data.key;
      that.leaveTimeout = data.timeout;
      that.leaveDelay = data.delay;
      that.leaveClass = data.className;
      lastRun.current.push(leave);
      initAni(that.leaveKey, that.leave, that.leaveTimeout, isDone(leave));
    }
    if (!appear && !enter && !leave) {
      setIsLoad(true);
    }
    setAniConf(that);
  }, [appear, enter, leave]);

  restProps.isLoad = isLoad;
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
      {...restProps}
    />
  ) : (
    build(AnimateGroup)(restProps)
  );
};

export default Animate;

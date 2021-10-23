import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useTimer } from "reshow-hooks";

const useProgress = (props, propsPercent) => {
  const [percent, setPercent] = useState(() =>
    null != propsPercent ? propsPercent : 0
  );
  const [opacity, setOpacity] = useState(0);
  const lastPercent = useRef(0);

  const [runTick, stopTick] = useTimer(true);
  const [runComplete, stopComplete] = useTimer();
  const [runReset, stopReset] = useTimer();
  const [runOpacity] = useTimer();

  const _start = (goToPercent) => {
    if (!goToPercent || goToPercent > 100) {
      goToPercent = 100;
    }
    let end = lastPercent.current + 5;
    if (end >= goToPercent) {
      end = goToPercent;
      expose.pause();
    }

    if (end >= 100) {
      return expose.complete();
    } else {
      setPercent(end);
      runOpacity(() => setOpacity(1));
    }
  };

  useEffect(() => {
    lastPercent.current = percent;
  }, [percent]);

  useEffect(() => {
    if (null != propsPercent) {
      setPercent(propsPercent);
    }
  }, [propsPercent]);

  const expose = {
    complete: () => {
      expose.pause();
      setPercent(100);
      runComplete(() => expose.reset(), 500);
    },
    reset: (thisPercent) => {
      thisPercent = thisPercent || 0;
      setOpacity(thisPercent);
      runReset(() => setPercent(thisPercent));
    },
    pause: () => {
      stopTick();
      stopComplete();
      stopReset();
    },
    start: useCallback(
      (goToPercent, delay) => {
        stopTick();
        if (null == delay) {
          delay = props.delay;
        }
        runTick(() => _start(goToPercent), delay);
      },
      [props.delay]
    ),
  };

  return { expose, opacity, percent };
};

export default useProgress;

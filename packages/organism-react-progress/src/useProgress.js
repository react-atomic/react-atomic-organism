import React, { useState, useRef, useMemo, useCallback } from "react";

import { useTimer, useSyncChange, useSyncState } from "reshow-hooks";

const useProgress = (propsDelay, propsPercent) => {
  propsDelay = propsDelay ?? 200;
  propsPercent = propsPercent ?? 0;
  const [percent, setPercent, lastPercent] = useSyncState(propsPercent);
  useSyncChange(propsPercent, setPercent);
  const [opacity, setOpacity] = useState(0);

  const [runTick, stopTick] = useTimer(true);
  const [runComplete, stopComplete] = useTimer();
  const [runReset, stopReset] = useTimer();
  const [runOpacity] = useTimer();

  const _start = (goToPercent) => {
    if (!goToPercent || goToPercent > 100) {
      goToPercent = 100;
    }
    let end = lastPercent() + 5;
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

  const expose = {
    complete: () => {
      expose.pause();
      setPercent(100);
      runComplete(() => expose.reset(), 500);
    },
    reset: (thisPercent) => {
      thisPercent = thisPercent || 0;
      setOpacity(0);
      runReset(() => setPercent(thisPercent), 300);
    },
    pause: () => {
      stopTick();
      stopComplete();
      stopReset();
    },
    start: useCallback(
      (goToPercent, delay) => {
        delay = delay ?? propsDelay;
        stopTick();
        runTick(() => _start(goToPercent), delay);
      },
      [propsDelay]
    ),
  };

  return { expose, opacity, percent };
};

export default useProgress;
